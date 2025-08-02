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
        <div>Please close the window to contine.</div>
        <q-btn label="Close" @click="closeWindow" class="q-mt-md" style="width:200px;" no-caps outline></q-btn>
    </div>
    <div v-else class="checkout-container"></div>

    <div v-if="isInvalidRequest" class="row text-h4 text-grey justify-center items-center" style="height:calc(80vh - 89px);">
        <span>Invalid Subscription Request!</span>
    </div>
</template>

<script>
import { initializePaddle, CheckoutEventNames } from '@paddle/paddle-js';
import { useCustomerStore } from 'src/stores/customer';
import { mapState, mapActions } from 'pinia'
import { PADDLE_CLIENT_API_TOKEN, PADDLE_ENVIRONMENT_IS_SANDBOX } from 'src/common/constants';

export default {
    emits: ['onCheckoutVerified'],
    data () {
        return {
            paddle: null,
            selectedPriceId: null,
            isInvalidRequest: false,

            counterOfVerify: 0,
            isCheckoutCompleted: false
        }
    },
    computed: {
        ...mapState(useCustomerStore, ['customer', 'hasActiveSubscription']),
    },
    methods: {
        ...mapActions(useCustomerStore, ['updateLoginToken']),
        closeWindow () { window.close(); },
        async paddleEventCallback (evt) {
            console.log(evt)
            if (evt.name == CheckoutEventNames.CHECKOUT_LOADED) {
                //Checkout Loaded
            } else if (evt.name == CheckoutEventNames.CHECKOUT_COMPLETED) {
                console.log('posted subscription message');
                this.isCheckoutCompleted = true;
            } else if (evt.name == CheckoutEventNames.CHECKOUT_ERROR) {
                console.log('checkout error')
            } else if (evt.name == CheckoutEventNames.CHECKOUT_FAILED) {
                console.log('checkout failed')
            }
        },

        async initializePaddlePricings () {
            try {
                this.paddle = await initializePaddle({
                    environment: PADDLE_ENVIRONMENT_IS_SANDBOX ? "sandbox" : "production",
                    token: PADDLE_CLIENT_API_TOKEN,
                    checkout: {
                        settings: {
                            theme: "light",
                            displayMode: "inline",
                            frameTarget: "checkout-container",
                            frameInitialHeight: "500",
                            frameStyle: "background-color:white;width:100%;",
                            /* variant: "one-page" */
                        }
                    },
                    eventCallback: this.paddleEventCallback
                });

                if (this.paddle.Initialized) {
                    try {
                        this.paddle.Checkout.open({
                            items: [
                                { priceId: this.selectedPriceId, quantity: 1 }
                            ],
                            customer: { email: this.customer?.easymeta__Email__c }
                        });
                    } catch (error) {
                        console.error(`Checkout error: ${error.message}`);
                    }
                }
            } catch (error) {
                console.error("Initialization error:", error);
            }
        },
    },
    async mounted () {
        let { pid, token } = this.$route.query;
        if (token) {
            await this.updateLoginToken(token);
        }

        if (pid != null) {
            this.selectedPriceId = pid;
            this.initializePaddlePricings();
        } else {
            this.isInvalidRequest = true;
        }
    }
}
</script>
<style scoped>
ul li {
    margin: 15px;
}
</style>
