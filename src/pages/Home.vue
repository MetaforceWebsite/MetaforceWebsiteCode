<template>
    <q-page>
        <q-parallax height="700" :speed="0.99" :src="require('assets/home-bg.png')" class="text-white text-center">
            <div class="text-h2 text-bold q-mb-md">Welcome To Metaforce World</div>
            <div class="text-h6 q-ma-xl q-px-xl">Metaforce is a powerful salesforce adminstration and development tool <br />which helps you to manage and customize your salesforce organizations faster and easier!</div>
            <div class="user-guide-links text-h6 q-mb-lg q-px-xl">
                <a target="_blank" href="https://allen-li.notion.site/Organizations-4350afbe73f040d2b25531020b983cee">Manage Organizations</a> |
                <a target="_blank" href="https://allen-li.notion.site/Projects-be46c2c8c1bd4942a99224cb173fad96">Projects (Apex Code Editor)</a> |
                <a target="_blank" href="https://allen-li.notion.site/Deployments-fbda9eed87bd43a4a68c1146d6b4f840">Metadata Deployments</a> |
                <a target="_blank" href="https://allen-li.notion.site/Data-Manager-c397c2ba17a94e08a63a0b594dc41366">Data Export/Import</a>
            </div>
            <div class="q-my-xl">
                <q-btn class="bg-blue-9 q-px-lg q-ma-md" type="a" target="_blank" href="/" size="md" flat icon="laptop" label="Install For Mac OS"></q-btn>
                <q-btn class="bg-blue-9 q-px-lg q-ma-md" disable type="a" target="_blank" href="/" size="md" flat icon="tablet_mac" label="Install For IPAD(Coming Soon...)"></q-btn>
                <q-btn class="bg-deep-purple-8 q-px-lg q-ma-md " type="a" target="_blank" href="https://allen-li.notion.site/Metaforce-User-Guide-03bfa81b0cc646259c75669d76386d7a" size="md" flat icon="menu_book" label="Check User Guide"></q-btn>
                <q-btn class="bg-green-9 q-px-lg q-ma-md " type="a" target="_blank" href="https://groups.google.com/g/metaforce-support" size="md" flat icon="diversity_1" label="Join Our Group"></q-btn>
            </div>
        </q-parallax>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexPage',
    methods: {

    }
})
</script>
<style lang="scss">
.custom-container .q-parallax__content {
    position: inherit;
    display: block;
    text-align: left;
}
.user-guide-links a {
    color: white;
}
</style>
