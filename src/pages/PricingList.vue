<template>
    <div class="q-py-lg text-center bg-primary text-white">
        <q-item-label class="text-h4">Metaforce Subscriptions</q-item-label>
    </div>
    <div v-if="hasActiveSubscription" class="row q-ma-md">
        <div class="col"></div>
        <q-banner inline-actions rounded class="col-5 bg-positive text-white text-center">
            <template v-slot:avatar>
                <q-icon name="campaign" />
            </template>
            <span>You have at least one active metaforce subscription already.</span>
            <template v-slot:action>
                <q-btn flat no-caps to="/customer" label="View" />
            </template>
        </q-banner>
        <div class="col"></div>
    </div>

    <q-list class="q-mx-xl q-mt-md">
        <q-item class="q-pl-sm">
            <q-item-section class="text-body1" style="font-size:25px;">
                <q-item-label>Choose a subscription plan</q-item-label>
                <q-item-label caption>During the free trial or the subscription, you can cancel the subscription at any time.</q-item-label>
            </q-item-section>
        </q-item>

        <div v-if="isPricesLoading" class="text-center q-my-xl">
            <q-spinner-bars size="md" color="primary"></q-spinner-bars>
            <div class="q-mt-md">Loading Subscription Plans ...</div>
        </div>
        <template v-else>
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
import { get } from 'src/common/request';
import { METAFORCE_SERVICE_URL_CUSTOMER } from 'src/common/constants';

const SANDBOX_CLIENT_API_TOKEN = 'test_ca588667e6359ffbb474343f37c';
const SANDBOX_PRODUCT = 'pro_01jta1nqfnen7s2swak6yd9krz';
const SANDBOX_MONTHLY_PRICE = 'pri_01jta1x1vj0r3q7ft9byvyam2t';
const SANDBOX_QUARTERLY_PRICE = 'pri_01jta21d8bn3h7m6v98nary7pf';
const SANDBOX_HALFYEAR_PRICE = 'pri_01jta252eyxyggvjnpehsbytgf';
const SANDBOX_YEARLY_PRICE = 'pri_01jta26588t1nab896hrezmrtn';
const SANDBOX_ONE_TIME_PRICE = 'pri_01jta2a2c2b9cadz106hr096cw';

const PROD_CLIENT_API_TOKEN = 'live_a68dd372f7809ffb069202d9049';
const PROD_MONTHLY_PRICE = 'pri_01jtyvx2mrfd78x92fnwyjmavq';
const PROD_QUARTERLY_PRICE = 'pri_01jtyvy0pfvb450de3y8wr8jze';
const PROD_HALFYEAR_PRICE = 'pri_01jtyvyqv9djjekg5ygjkbnbm0';
const PROD_YEARLY_PRICE = 'pri_01jtyvzka5rrjgd2b7radjxc6c';
const PROD_ONE_TIME_PRICE = 'pri_01jtyw0g3ph49twwt76qgh1gjz';

const PRICE_REQUESTS = {
    items: [
        { quantity: 1, priceId: SANDBOX_MONTHLY_PRICE },
        { quantity: 1, priceId: SANDBOX_QUARTERLY_PRICE },
        { quantity: 1, priceId: SANDBOX_HALFYEAR_PRICE },
        { quantity: 1, priceId: SANDBOX_YEARLY_PRICE },
        { quantity: 1, priceId: SANDBOX_ONE_TIME_PRICE },

        /* { quantity: 1, priceId: PROD_MONTHLY_PRICE }, */
    ]/* ,
    address: {
        countryCode: 'US'
    } */
};

export default {
    emits: ['onCheckoutVerified'],
    data () {
        return {
            paddle: null,
            selectedPriceId: SANDBOX_MONTHLY_PRICE,
            paddlePrices: [],

            isPricesLoading: false,
            isCheckoutLoading: false,

            isVerifyingSubs: false,
            counterOfVerify: 0
        }
    },
    computed: {
        ...mapState(useCustomerStore, ['loginToken', 'customer', 'isLoggedIn', 'hasActiveSubscription']),
        isPaddleInitialized () { return this.paddle?.Initialized; },
    },
    methods: {
        ...mapActions(useCustomerStore, ['updateCustomer']),
        paddleEventCallback (evt) {
            if (evt.name == CheckoutEventNames.CHECKOUT_LOADED) {
                this.isCheckoutLoading = false;
            } else if (evt.name == CheckoutEventNames.CHECKOUT_COMPLETED) {
                this.paddle.Checkout.close();
                this.isVerifyingSubs = true;
                this.verifySubscription();
            }
        },
        async initializePaddle () {
            try {
                this.isPricesLoading = true;
                this.paddle = await initializePaddle({
                    environment: "sandbox",
                    token: SANDBOX_CLIENT_API_TOKEN,
                    checkout: {
                        settings: {
                            //allowLogout: true,
                            theme: "light",
                            displayMode: "overlay",
                            frameInitialHeight: 450,
                            //variant: "one-page"
                        }
                    },
                    eventCallback: this.paddleEventCallback
                });

                if (this.paddle.Initialized) {
                    this.loadPaddlePrices();
                } else {
                    this.isPricesLoading = false;
                }
            } catch (error) {
                console.error("Initialization error:", error);
            }
        },
        async loadPaddlePrices () {
            const result = await this.paddle.PricePreview(PRICE_REQUESTS);
            this.paddlePrices = result.data.details.lineItems.map(item => {
                let { id, name, description } = item.price;
                let { discount, tax, total } = item.formattedTotals;

                return { id, name, description, discount, tax, total };
            });
            this.isPricesLoading = false;
        },

        async verifySubscription () {
            let customer = await get(`${METAFORCE_SERVICE_URL_CUSTOMER}?token=${this.loginToken}`);
            if (customer.Id) {
                this.updateCustomer(customer);

                if (this.hasActiveSubscription || this.counterOfVerify >= 5) {
                    this.isVerifyingSubs = false;
                    this.$router.push('/customer');
                } else {
                    await suspend(1000);
                    this.counterOfVerify++;
                    await this.verifySubscription();
                }
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
        let appToken = this.$route.query.token;
        if (appToken?.length > 30) {
            this.updateLoginToken(appToken);
        }

        if (!this.paddle) this.initializePaddle()
    },
}
</script>
<style scoped>
ul li {
    margin: 15px;
}
</style>
