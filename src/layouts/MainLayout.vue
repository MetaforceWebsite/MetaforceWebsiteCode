<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="bg-white text-black q-pr-none q-py-md">
                <q-avatar size="xl" style="font-size:50px;">
                    <img :src="require('assets/metaforce.png')" />
                </q-avatar>
                <q-toolbar-title>
                    <span class="text-h5 q-mx-sm">Metaforce</span>
                    <span>
                        <q-btn flat stretch label="Home" to="/" class="text-subtitle"></q-btn>
                    </span>
                </q-toolbar-title>
                <!-- <q-btn icon="shopping_bag" color="deep-purple" flat stretch label="Pricing" to="/" class="text-subtitle"></q-btn> -->
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer class="bg-grey-1">
            <q-separator class="bg-grey-3"></q-separator>
            <q-toolbar class="text-black text-center" style="min-height:30px;">
                <q-toolbar-title class="text-caption">
                    <router-link to="/privacy">Privacy Policy</router-link> | © Copyright 2022 Metaforce+
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainLayout',
    computed: {
    }
})
</script>
