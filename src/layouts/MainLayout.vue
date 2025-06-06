<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="bg-white text-black q-py-md">
                <router-link to="/">
                    <q-avatar size="xl" style="font-size:50px;">
                        <img src="~assets/metaforce.png" />
                    </q-avatar>
                </router-link>
                <q-toolbar-title>
                    <router-link to="/" class="text-h5 q-mx-sm" style="color:black;text-decoration:none;">Metaforce</router-link>
                </q-toolbar-title>
                <q-btn class="q-px-md" to="/" size="md" flat icon="home" label="Home" no-caps></q-btn>
                <q-btn class="q-px-md" to="/pricing" size="md" flat icon="shopping_cart" label="Pricing" no-caps></q-btn>
                <q-btn class="q-px-md" to="/guide" size="md" flat icon="school" label="Docs" no-caps></q-btn>

                <q-btn-dropdown v-if="isLoggedIn || isLoadingCustomer" :loading="isLoadingCustomer" :label="customerName" class="q-px-md" size="md" icon="account_circle" no-caps flat>
                    <template v-slot:loading>
                        <q-spinner-bars size="xs" color="primary"></q-spinner-bars>
                    </template>
                    <q-list separator>
                        <q-item clickable to="/customer">
                            <q-item-section side>
                                <q-icon name="account_circle"></q-icon>
                            </q-item-section>
                            <q-item-section>My Account</q-item-section>
                        </q-item>
                        <q-item clickable @click="signOut">
                            <q-item-section side>
                                <q-icon name="logout"></q-icon>
                            </q-item-section>
                            <q-item-section>Sign Out</q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
                <q-btn v-else @click="$refs.loginFormCmp.showLogin()" class="q-px-md" size="md" icon="login" label="Sign In" flat no-caps></q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer>
            <div class="bg-grey-1">
                <q-toolbar class="text-black text-center" style="min-height:30px;">
                    <q-toolbar-title class="text-caption">
                        © Copyright 2025 Metaforce+ |
                        <router-link to="/terms" class="policy-link">Term Of Use</router-link> |
                        <router-link to="/privacy" class="policy-link">Privacy Policy</router-link> |
                        <router-link to="/contactus" class="policy-link">Contact Us</router-link>
                    </q-toolbar-title>
                </q-toolbar>
            </div>
        </q-footer>
    </q-layout>

    <login-form v-if="!isLoggedIn" ref="loginFormCmp"></login-form>
</template>

<script>
import LoginForm from 'src/components/LoginForm.vue';
import { useCustomerStore } from 'src/stores/customer';

import { notifyError } from 'src/common/notify';

export default {
    components: { LoginForm },
    data () {
        return {
            isShowLogin: false,
            isLoadingCustomer: false,
        }
    },
    computed: {
        isLoggedIn () { return useCustomerStore().isLoggedIn },
        customerName () { return useCustomerStore().customer?.easymeta__FirstName__c || ''; },
    },
    methods: {
        signOut () {
            useCustomerStore().clearLoginStore();
        },
    },
    async mounted () {
        if (this.isLoggedIn) {
            try {
                this.isLoadingCustomer = true;
                await useCustomerStore().refreshCustomer();
            } catch (ex) {
                notifyError(ex);
            } finally {
                this.isLoadingCustomer = false;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.policy-link {
    color: black;
    text-decoration: none;
}
.policy-link:hover {
    text-decoration: underline;
}
</style>