<template>
    <div class="q-py-lg text-center bg-primary text-white">
        <q-item-label class="text-h4">Metaforce Subscriptions</q-item-label>
    </div>

    <q-list v-if="!isCheckoutLoaded" class="q-mx-xl q-mt-md">
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
                    <q-btn :disabled="!isPaddleInitialized" :loading="isCheckoutLoading" @click="subscribeNow" label="Subscribe Now" color="white" class="bg-positive" style="min-height:50px;" flat stretch no-caps></q-btn>
                </q-item-section>
            </q-item>
            <q-item v-if="!isInApp" class="q-pa-none q-mt-md">
                <q-item-section>
                    <q-btn label="Back" style="min-height:50px;" @click="goBack" flat stretch no-caps></q-btn>
                </q-item-section>
            </q-item>
        </template>
    </q-list>

    <div :style="`display:${isCheckoutLoaded?'block':'none'}`">
        <div class="checkout-container"></div>
        <q-list class="q-mx-xl q-my-sm">
            <q-item class="q-pa-none q-mt-md">
                <q-item-section class="col-2"></q-item-section>
                <q-item-section>
                    <q-btn label="Cancel" style="min-height:50px;" @click="clearCheckout" stretch no-caps></q-btn>
                </q-item-section>
                <q-item-section class="col-2"></q-item-section>
            </q-item>
        </q-list>

    </div>
    <q-inner-loading :showing="isVerifyingSubs" style="background-color:rgba(255,255,255,0.8);" color="primary" label="Please wait...">
        <div><q-spinner-bars color="primary" size="md"></q-spinner-bars></div>
        <div class="q-mt-md text-primary text-h6">
            Verifying your subscription...
        </div>
    </q-inner-loading>
</template>

<script>
import { initializePaddle } from '@paddle/paddle-js';
import { notifyError } from 'src/common/notify';
import { pageStorage, suspend } from 'src/common/utils';
import { get } from 'src/common/request';
import { METAFORCE_SERVICE_URL_CUSTOMER } from 'src/common/constants';

const SANDBOX_CLIENT_API_TOKEN = 'test_ca588667e6359ffbb474343f37c';
const SANDBOX_PRODUCT = 'pro_01jta1nqfnen7s2swak6yd9krz';
const SANDBOX_MONTHLY_PRICE = 'pri_01jta1x1vj0r3q7ft9byvyam2t';
const SANDBOX_QUARTERLY_PRICE = 'pri_01jta21d8bn3h7m6v98nary7pf';
const SANDBOX_HALFYEAR_PRICE = 'pri_01jta252eyxyggvjnpehsbytgf';
const SANDBOX_YEARLY_PRICE = 'pri_01jta26588t1nab896hrezmrtn';
const SANDBOX_ONE_TIME_PRICE = 'pri_01jta2a2c2b9cadz106hr096cw';

const PRICE_REQUESTS = {
    items: [
        { quantity: 1, priceId: SANDBOX_MONTHLY_PRICE },
        { quantity: 1, priceId: SANDBOX_QUARTERLY_PRICE },
        { quantity: 1, priceId: SANDBOX_HALFYEAR_PRICE },
        { quantity: 1, priceId: SANDBOX_YEARLY_PRICE },
        { quantity: 1, priceId: SANDBOX_ONE_TIME_PRICE },
    ],
    address: {
        countryCode: 'US'
    }
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
            isCheckoutLoaded: false,
            isCheckoutCompleted: false,

            isVerifyingSubs: false,
            counterOfVerify: 0
        }
    },
    props: {
        isInApp: { type: Boolean, default: false },
        token: { type: String },
    },
    computed: {
        isPaddleInitialized () { return this.paddle?.Initialized; },
    },
    methods: {
        paddleEventCallback (evt) {
            if (evt.name == 'checkout.loaded') {
                this.isCheckoutLoading = false;
                this.isCheckoutLoaded = true;
            } else if (evt.name == 'checkout.completed') {
                this.isCheckoutCompleted = true;
                this.isVerifyingSubs = true;

                this.verifySubscription();
            } else if (evt.name == 'checkout.warning') {

            } else if (evt.name == 'checkout.error') {

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
                            theme: "light",
                            frameTarget: "checkout-container",
                            displayMode: "inline",
                            frameInitialHeight: 450,
                            frameStyle: "background-color:white;width:100%;",
                            variant: "one-page"
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
            const result = await Paddle.PricePreview(PRICE_REQUESTS);
            this.paddlePrices = result.data.details.lineItems.map(item => {
                let { id, name, description } = item.price;
                let { discount, tax, total } = item.formattedTotals;

                return { id, name, description, discount, tax, total };
            });
            this.isPricesLoading = false;
        },
        async getCustomer () {
            return await get(`${METAFORCE_SERVICE_URL_CUSTOMER}?token=${this.token}`);
        },
        async subscribeNow () {
            let customer = pageStorage.getCustomer();

            if (this.isInApp) {
                customer = await this.getCustomer();
                console.log(customer)
            }

            if (customer?.easymeta__Email__c) {
                if (this.isPaddleInitialized) {
                    try {
                        this.isCheckoutLoading = true;
                        this.paddle.Checkout.open({
                            items: [
                                { priceId: this.selectedPriceId, quantity: 1 }
                            ],
                            customer: {
                                email: customer.easymeta__Email__c
                            }
                        });
                    } catch (error) {
                        console.error(`Checkout error: ${error.message}`);
                    }
                }
            } else {
                notifyError(`Please log in with your email, then continue to subscribe.`)
            }
        },
        async verifySubscription () {
            let customer = await this.getCustomer();
            if (customer.Id) {
                let subscriptions = customer.easymeta__PaddleSubscriptions__r?.records || [];
                let isValid = subscriptions.filter(sub => ['active', 'trialing'].includes(sub.easymeta__Status__c)).length > 0;
                if (isValid) {
                    this.clearCheckout();
                    this.isVerifyingSubs = false;
                    if (this.isInApp) {
                        this.$emit('onCheckoutVerified', customer);
                    } else {
                        this.$route.push('/customer');
                    }
                } else if (this.counterOfVerify >= 10) {
                    this.clearCheckout();
                    this.isVerifyingSubs = false;
                } else {
                    await suspend(1000);
                    this.counterOfVerify++;
                    await this.verifySubscription();
                }
            }
        },
        goBack () { this.$router.go(-1); },
        clearCheckout () {
            document.querySelector('div.checkout-container').innerHTML = "";
            this.isCheckoutLoaded = false;
        }
    },
    async mounted () {
        let appToken = this.$route.query.token;
        if (appToken?.length > 30) {
            this.loginToken = appToken;
            pageStorage.setLoginToken(appToken);
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
