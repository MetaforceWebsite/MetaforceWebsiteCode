<template>
    <div class="q-py-lg text-center bg-primary text-white">
        <q-item-label class="text-h4">Metaforce Subscriptions</q-item-label>
    </div>
    <div v-if="isCheckoutCompleted" class="text-center" style="margin-top:100px;">
        <div class="text-positive">
            <q-icon size="7rem" color="positive" name="verified"></q-icon>
            <div class="text-h5 q-py-lg text-bold">
                Congrats! <br />You have subscribed Metaforce successfully.
            </div>
        </div>
        <br />
        <div>The detailed subscription information will be sent to your email address shortly.</div>
        <q-btn label="View My Subscription" @click="goToCustomerPage" class="q-mt-md" color="positive" style="width:200px;" no-caps outline></q-btn>
    </div>
    <q-list v-else class="q-mx-xl q-mt-md">
        <div v-if="isPricesLoading" class="text-center q-my-xl">
            <q-spinner-bars size="md" color="primary"></q-spinner-bars>
            <div class="q-mt-md">Loading Subscription Plans ...</div>
        </div>
        <template v-else>
            <div v-if="hasActiveSubscription" class="row justify-center q-ma-md">
                <q-banner inline-actions rounded class="bg-positive text-white text-center">
                    <template v-slot:avatar>
                        <q-icon name="campaign" />
                    </template>
                    <spa>You already have at least one active metaforce subscription.</spa>
                    <template v-slot:action>
                        <q-btn flat no-caps to="/customer" label="View" />
                    </template>
                </q-banner>
            </div>
            <q-item class="q-pl-sm">
                <q-item-section class="text-body1" style="font-size:25px;">
                    <q-item-label>Choose a subscription plan</q-item-label>
                    <q-item-label caption>During the free trial or the subscription, you can cancel the subscription at any time.</q-item-label>
                </q-item-section>
            </q-item>
            <q-list bordered separator padding>
                <q-item v-for="(price, index) in paddlePrices" :key="index" tag="label" :class="price.id == selectedPriceId ? 'text-primary text-bold':''" clickable>
                    <q-item-section avatar>
                        <q-radio v-model="selectedPriceId" :val="price.id"></q-radio>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{price.name}}</q-item-label>
                        <q-item-label :class="price.id == selectedPriceId ? 'text-primary':''" caption>{{price.description}}</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-item-label>{{price.total}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-item class="q-pa-none q-my-md">
                <q-item-section>
                    <q-btn v-if="isLoggedIn" :disabled="!isPaddleInitialized" :loading="isCheckoutLoading" @click="subscribeNow" label="Subscribe Now" color="white" class="bg-positive" style="min-height:50px;" flat stretch no-caps>
                        <template v-slot:loading>
                            <q-spinner-bars size="sm"></q-spinner-bars>
                        </template>
                    </q-btn>
                    <template v-else>
                        <div class="row justify-center items-center">

                            <span class="q-ml-xs text-caption">Before the subscription, you have to sign in to or sign up for Metaforce.</span>
                        </div>
                        <q-btn label="Sign In / Sign Up" @click="$bus.emit('showLogin')" color="white" class="bg-positive" style="min-height:50px;" flat stretch no-caps>
                            <template v-slot:loading>
                                <q-spinner-bars size="sm"></q-spinner-bars>
                            </template>
                        </q-btn>
                    </template>

                </q-item-section>
            </q-item>
            <q-item class="q-pa-none q-mt-md">
                <q-item-section>
                    <q-btn label="Back" style="min-height:50px;" @click="$router.go(-1)" flat stretch no-caps></q-btn>
                </q-item-section>
            </q-item>
        </template>
    </q-list>

    <q-inner-loading :showing="isVerifyingSubs" style="background-color:rgba(255,255,255,0.8);" color="primary" label="Please wait...">
        <div><q-spinner-bars color="primary" size="md"></q-spinner-bars></div>
        <div class="q-mt-md text-primary text-h6">
            Verifying your subscription...
        </div>
    </q-inner-loading>
</template>

<script>
import { initializePaddle, CheckoutEventNames } from '@paddle/paddle-js';
import { useCustomerStore } from 'src/stores/customer';
import { mapActions, mapState } from 'pinia'
import { suspend } from 'src/common/utils';

import { PADDLE_ENVIRONMENT_IS_SANDBOX, PADDLE_CLIENT_API_TOKEN, PADDLE_PRICE_REQUESTS } from 'src/common/constants';

export default {
    emits: ['onCheckoutVerified'],
    data () {
        return {
            paddle: null,
            selectedPriceId: PADDLE_PRICE_REQUESTS.items[0].priceId,
            paddlePrices: [],

            isPricesLoading: false,
            isCheckoutLoading: false,

            isVerifyingSubs: false,
            counterOfVerify: 0,
            isCheckoutCompleted: false
        }
    },
    computed: {
        ...mapState(useCustomerStore, ['loginToken', 'customer', 'isLoggedIn', 'hasActiveSubscription']),
        isPaddleInitialized () { return this.paddle?.Initialized; },
        isFromApp () { return this.$route.query.pid != null; }
    },
    methods: {
        ...mapActions(useCustomerStore, ['refreshCustomer']),
        goToCustomerPage () {
            this.$router.push('/customer').then(() => {
                window.location.reload();
            })
        },
        async paddleEventCallback (evt) {
            if (evt.name == CheckoutEventNames.CHECKOUT_LOADED) {
                this.isCheckoutLoading = false;
            } else if (evt.name == CheckoutEventNames.CHECKOUT_COMPLETED) {
                this.paddle.Checkout.close();
                this.isVerifyingSubs = true;
                await suspend(3000);
                this.isVerifyingSubs = false;
                this.isCheckoutCompleted = true;
            } else if (evt.name == CheckoutEventNames.CHECKOUT_ERROR ||
                evt.name == CheckoutEventNames.CHECKOUT_FAILED ||
                evt.name == CheckoutEventNames.CHECKOUT_CLOSED) {
                this.isCheckoutLoading = false;
            }
        },
        async initializePaddlePricings () {
            try {
                this.isPricesLoading = true;
                this.paddle = await initializePaddle({
                    environment: PADDLE_ENVIRONMENT_IS_SANDBOX ? "sandbox" : "production",
                    token: PADDLE_CLIENT_API_TOKEN,
                    checkout: {
                        settings: {
                            theme: "light",
                            displayMode: "overlay",
                            //variant: "one-page"
                        }
                    },
                    eventCallback: this.paddleEventCallback
                });

                if (this.paddle.Initialized) {
                    const result = await this.paddle.PricePreview(PADDLE_PRICE_REQUESTS);
                    this.paddlePrices = result.data.details.lineItems.map(item => {
                        let { id, name, description } = item.price;
                        let { discount, tax, total } = item.formattedTotals;

                        return { id, name, description, discount, tax, total };
                    });

                    if (this.isFromApp) {
                        this.subscribeNow();
                    }
                }
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                this.isPricesLoading = false;
            }
        },

        async subscribeNow () {
            let customerEmail = this.customer?.easymeta__Email__c;
            let checkoutSetting = {
                items: [
                    { priceId: this.selectedPriceId, quantity: 1 }
                ]
            };
            if (customerEmail) checkoutSetting['customer'] = { email: customerEmail };

            if (this.isPaddleInitialized) {
                try {
                    this.isCheckoutLoading = true;
                    this.paddle.Checkout.open(checkoutSetting);
                } catch (error) {
                    console.error(`Checkout error: ${error.message}`);
                }
            }
        },
    },
    async mounted () {
        this.initializePaddlePricings();
    },
}
</script>
<style scoped>
ul li {
    margin: 15px;
}
</style>
