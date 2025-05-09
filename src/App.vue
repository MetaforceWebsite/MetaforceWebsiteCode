<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useCustomerStore } from './stores/customer'

export default defineComponent({
    name: 'App',
    mounted () {
        useCustomerStore().initLoginStore();
    }
})
</script>
