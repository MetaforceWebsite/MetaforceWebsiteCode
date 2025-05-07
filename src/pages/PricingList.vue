<template>
    <div class="q-py-lg text-center bg-primary text-white">
        <q-item-label class="text-h4">Metaforce Subscriptions</q-item-label>
    </div>
    <q-separator></q-separator>
    <q-list class="q-mx-xl q-mt-md">
        <q-item class="q-pl-sm">
            <q-item-section class="text-body1" style="font-size:25px;">
                <q-item-label>Choose a subscription plan</q-item-label>
                <q-item-label caption>During the free trial or the subscription, you can cancel the subscription at any time.</q-item-label>
            </q-item-section>
        </q-item>

        <div v-if="isLoadingPrices" class="text-center q-my-xl">
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
                    <q-btn :disabled="!isPaddleInitialized" @click="subscribeNow" label="Subscribe Now" color="white" class="bg-positive" style="min-height:50px;" flat stretch></q-btn>
                </q-item-section>
            </q-item>
            <q-item v-if="!isInApp" class="q-pa-none q-mt-md">
                <q-item-section>
                    <q-btn label="Back" style="min-height:50px;" @click="goBack" flat stretch></q-btn>
                </q-item-section>
            </q-item>
        </template>
    </q-list>
</template>

<script>
import { initializePaddle } from '@paddle/paddle-js';
import { notifyError } from 'src/common/notify';
import { pageStorage } from 'src/common/utils';

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
    data () {
        return {
            paddle: null,
            isLoadingPrices: false,
            selectedPriceId: SANDBOX_MONTHLY_PRICE,
            paddlePrices: []
        }
    },
    props: {
        isInApp: { type: Boolean, default: false },
    },
    computed: {
        isPaddleInitialized () { return this.paddle?.Initialized; },
    },
    methods: {
        goBack () { this.$router.go(-1); },
        async subscribeNow () {
            let cachedCustomer = pageStorage.getCustomer();
            if (cachedCustomer?.easymeta__Email__c) {
                if (this.isPaddleInitialized) {
                    try {
                        this.paddle.Checkout.open({
                            items: [
                                { priceId: this.selectedPriceId, quantity: 1 }
                            ],
                            customer: {
                                email: cachedCustomer.easymeta__Email__c
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

        async initializePaddle () {
            try {
                this.isLoadingPrices = true;
                this.paddle = await initializePaddle({
                    environment: "sandbox",
                    token: SANDBOX_CLIENT_API_TOKEN,
                    checkout: {
                        settings: {
                            theme: "light",
                            displayMode: "overlay",
                            variant: "one-page",
                        }
                    }
                });

                if (this.paddle.Initialized) {
                    this.loadPaddlePrices();
                } else {
                    this.isLoadingPrices = false;
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
            this.isLoadingPrices = false;
        },
    },
    async mounted () {
        if (!this.paddle) this.initializePaddle()
    },
}
</script>
<style scoped>
ul li {
    margin: 15px;
}
</style>
