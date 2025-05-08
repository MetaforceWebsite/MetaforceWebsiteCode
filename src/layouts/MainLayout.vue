<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="bg-white text-black q-py-md">
                <router-link to="/">
                    <q-avatar size="xl" style="font-size:50px;">
                        <img :src="require('assets/metaforce.png')" />
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
                <q-btn v-else @click="isShowLogin=true" class="q-px-md" size="md" flat icon="login" label="Login"></q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer>
            <div class="bg-grey-1">
                <q-toolbar class="text-black text-center" style="min-height:30px;">
                    <q-toolbar-title class="text-caption">
                        © Copyright 2025 Metaforce+ | <router-link to="/privacy" class="policy-link">Privacy Policy</router-link>
                    </q-toolbar-title>
                </q-toolbar>
            </div>
        </q-footer>
    </q-layout>
    <q-dialog v-model="isShowLogin">
        <q-card style="width:100%;">
            <login-form @onLoginSuccess="loginSuccess"></login-form>
        </q-card>
    </q-dialog>
</template>

<script>
import loginForm from 'src/components/loginForm.vue';

import { METAFORCE_SERVICE_URL_CUSTOMER } from 'src/common/constants';
import { get } from 'src/common/request';
import { pageStorage } from 'src/common/utils';

export default {
    components: { loginForm },
    data () {
        return {
            loginToken: null,
            customer: null,
            isLoadingCustomer: false,
            isShowLogin: false,
        }
    },
    computed: {
        customerName () { return this.customer?.easymeta__FirstName__c || ''; },
        isLoggedIn () { return this.customer?.Id?.length > 0; },
    },
    methods: {
        async initializeCustomer () {
            try {
                this.isLoadingCustomer = true;
                let customer = await get(`${METAFORCE_SERVICE_URL_CUSTOMER}?token=${this.loginToken}`);
                if (customer.Id) {
                    this.customer = customer;
                    pageStorage.setCustomer(customer);
                } else {
                    this.customer = null;
                    pageStorage.clearLoginCache();
                }
            } catch (ex) {
                this.customer = null;
                pageStorage.clearLoginCache();
            } finally {
                this.isLoadingCustomer = false;
            }

        },
        loginSuccess ({ customer }) {
            this.isShowLogin = false;
            this.customer = customer;
        },
        signOut () {
            pageStorage.clearLoginCache();
            this.customer = null;
            this.$router.push('/');
        },
    },
    async mounted () {
        this.loginToken = pageStorage.getLoginToken();
        if (this.loginToken) {
            this.initializeCustomer();
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