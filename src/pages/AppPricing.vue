<template>
    <div v-if="token" class="q-pb-xs">
        <pricing-list :token="token" @onCheckoutVerified="onCheckoutVerified" isInApp></pricing-list>
    </div>
</template>

<script>
import PricingList from './PricingList.vue';
export default {
    components: { PricingList },
    data () {
        return {
            token: null
        }
    },
    methods: {
        onCheckoutVerified (customer) {
            window.parent.postMessage({ type: 'checkout.completed', customer }, "*");
        },
    },
    mounted () {
        this.token = this.$route.params.token;
    }
}
</script>
