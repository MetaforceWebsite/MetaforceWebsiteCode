<template>
    <div class="q-pb-xs">
        <pricing-list isInApp></pricing-list>
    </div>
</template>

<script>
import PricingList from './PricingList.vue';
export default {
    components: { PricingList },
    data () {
        return {
        }
    },
    methods: {
        loginSuccess (data) {
            window.parent.postMessage(data, "*");
        },
    }
}
</script>
