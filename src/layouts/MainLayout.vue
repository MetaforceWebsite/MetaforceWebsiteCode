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
                <q-btn class="q-px-lg" type="a" target="_blank" href="https://allen-li.notion.site/Metaforce-User-Guide-03bfa81b0cc646259c75669d76386d7a" size="md" flat icon="menu_book" label="Check User Guide"></q-btn>
                <q-btn class="q-px-lg" @click="scorllToBottom" size="md" flat icon="live_help" label="Submit A Case"></q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <div class="bg-grey-1">
            <q-separator class="bg-grey-3"></q-separator>
            <q-toolbar class="text-black text-center" style="min-height:30px;">
                <q-toolbar-title class="text-caption">
                    © Copyright 2022 Metaforce | <router-link to="/privacy" class="policy-link">Privacy Policy</router-link>
                </q-toolbar-title>
            </q-toolbar>
        </div>
    </q-layout>
</template>
<style lang="scss" scoped>
.policy-link {
    color: black;
    text-decoration: none;
}
.policy-link:hover {
    text-decoration: underline;
}
</style>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainLayout',
    computed: {
    },
    methods: {
        scorllToBottom () {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
})
</script>
