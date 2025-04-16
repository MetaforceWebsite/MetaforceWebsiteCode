<template>
    <q-page class="q-ma-xl">
        <div class="text-h3 text-bold q-mb-lg">
            <div class="q-pb-lg">Subscriptions</div>
            <q-separator></q-separator>
        </div>

        <div>Currently, Metaforce privides 3 subscription options. All subscriptions grant full access to all Metaforce features.</div>
        <ul>
            <li>1 Month Subscription - <q-badge label="$4.99 / Month" class="text-subtitle2"></q-badge></li>
            <li>6 Months Subscription - <q-badge label="$19.9 / 6 Months ($3.31/Month, Save 35%)" class="text-subtitle2"></q-badge></li>
            <li>1 Year Subscription - <q-badge label="$29.9 / Year ($2.49/Month, Save 50%)" class="text-subtitle2"></q-badge></li>
        </ul>

        <div class="q-mt-xl">Notes:</div>
        <ul>
            <li>Currently, we only support subscribing to Metaforce from an apple device (Mac, iPad, iPhone).</li>
            <li>Please go to the Apple Store on your apple device, search and install the "Metaforce" app.</li>
        </ul>

        <div class="q-mt-xl">
            <q-btn label="Back" to="/" outline no-caps></q-btn>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    methods: {

    }
})
</script>
<style scoped>
ul li {
    margin: 15px;
}
</style>
