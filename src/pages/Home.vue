<template>
    <q-page>
        <q-parallax style="height:600px" :speed="1" :src="require('assets/home-bg.png')" class="text-white text-center">
            <div class="text-h2 text-bold q-mb-md">Welcome To Metaforce World</div>
            <div class="text-h6 q-ma-xl q-px-xl q-pt-md">
                <div>Metaforce is a powerful salesforce administration and development tool <br />which helps you to manage and customize your salesforce organizations faster and easier!</div>
                <div style="margin-top:15px;font-size:1rem;">Org Management | Apex Development | Metadata Deployment | Data Migration | SOQL Explorer</div>
                <span class="inline-block q-mt-lg" style="border-top:1px dashed white;border-bottom:1px dashed white;">Available On Mac OS, IPad, Windows</span>
            </div>
            <div class="q-mt-lg">
                <template v-for="(installButton, index) in installButtons" :key="index">
                    <q-btn no-caps class="q-py-sm q-ma-md" style="background-color:rgba(2,123,227,0.8);" type="a" target="_blank" :href="installButton.link" size="20px" flat :icon="installButton.icon" :label="installButton.label"></q-btn>
                </template>
            </div>
        </q-parallax>

        <div class="text-h4 text-weight-bolder text-grey-9 text-center q-mb-xl">Manage Easier.<span class="q-ml-md">Customize Faster.</span> </div>
        <div class="q-px-xl q-pb-md">
            <q-tabs v-model="focusedFeatureTab" active-class="text-weight-bold" :indicator-color="featuredTabColor" dense :active-color="featuredTabColor" align="justify">
                <q-tab v-for="tabName in Object.keys(featureTabToColor)" :key="tabName" :name="tabName" :label="tabName" />
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="focusedFeatureTab" animated>
                <q-tab-panel name="Organizations" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mt-xs q-mr-md">
                        <q-icon color="primary" size="sm" name="hub"></q-icon>
                    </div>
                    <div class="col q-pr-xl">
                        <div class="text-h5 text-primary hover-underline" @click="openUrl('https://docs.metaforce.ltd/#/pages/coreFeatures/organizations')">Manage Org Connections
                            <q-icon :color="featuredTabColor" size="xs" name="open_in_new"></q-icon>
                        </div>
                        <div class="q-mt-md">
                            In Metaforce, you can connect and manage all your salesforce organizations via <a href="https://oauth.net/2/" target="_blank">OAuth 2.0 protocol</a>.
                            <div class="q-mt-sm">Once connected, you can perform handy actions below:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">Quick Login</b> - Access your salesforce org by one click! No password and MFA code needed any more!</li>
                                <li><b :class="`text-${featuredTabColor}`">Copy Login Link</b> - Share a temporary login link to people you trust.</li>
                                <li><b :class="`text-${featuredTabColor}`">Copy Access Token</b> - Get access token for calling salesforce api or other integration purpose.</li>
                                <li><b :class="`text-${featuredTabColor}`">Set New Password</b> - Set a new password directly for the user in your org.</li>
                                <li><b :class="`text-${featuredTabColor}`">Secret Notes</b> - Keep secret notes under your organization, like password, security token, etc.</li>
                                <li><b :class="`text-${featuredTabColor}`">Revoke Connection</b> - Revoke metaforce connection.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/org-demo.png')" class="rounded-borders cursor-pointer" src="~assets/images/org-demo.png" />
                    </div>
                </q-tab-panel>

                <q-tab-panel name="Projects" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mt-xs q-mr-md">
                        <q-icon color="deep-purple-9" size="sm" name="handyman"></q-icon>
                    </div>
                    <div class="col q-pr-sm">
                        <div class="text-h5 text-deep-purple-9 hover-underline" @click="openUrl('https://docs.metaforce.ltd/#/pages/coreFeatures/projects')">
                            Build Projects To Start SFDC Dev
                            <q-icon :color="featuredTabColor" size="xs" name="open_in_new"></q-icon>
                        </div>
                        <div class="q-mt-md">
                            In Metaforce, you can create a project to start your salesforce development just by few clicks! <br />Metaforce provides its own code editor to view and update your apex/page/aura/lwc code directly. It's <span class="text-bold">FASTER AND EASIER</span> than sfdx tool in visual studio code!
                            <div class="q-mt-sm">Metaforce Project provides following core actions:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">AI Actions on Apex</b> - Optimize/Document your apex code via pre-defined AI actions.</li>
                                <li><b :class="`text-${featuredTabColor}`">Save To Salesforce</b> - Save metadata to salesforce org, like apex code, vf page, aura, lwc, etc.</li>
                                <li><b :class="`text-${featuredTabColor}`">Refresh From Salesforce</b> - Refresh and Get latest metadata from salesforce org.</li>
                                <li><b :class="`text-${featuredTabColor}`">Run Apex Test</b> - You can run apex test class and check test result by one click!</li>
                                <li><b :class="`text-${featuredTabColor}`">View Test Coverage</b> - View the code coverage for apex class you tested.</li>
                                <li><b :class="`text-${featuredTabColor}`">Diff Metadata</b> - Compare the apex/visualforce/flow differences between a source org and a target org. </li>
                                <li><b :class="`text-${featuredTabColor}`">View Dependencies</b> - Show all references for selected component.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/project-demo.jpg')" class="rounded-borders cursor-pointer" src="~assets/images/project-demo.jpg" />
                    </div>
                </q-tab-panel>

                <q-tab-panel name="Deployments" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mr-md">
                        <q-icon color="teal" size="md" name="rocket"></q-icon>
                    </div>
                    <div class="col q-pr-sm">
                        <div class="text-h5 text-teal hover-underline" @click="openUrl('https://docs.metaforce.ltd/#/pages/coreFeatures/deployments')">
                            Deploy Metadata Changes In Real Time
                            <q-icon :color="featuredTabColor" size="xs" name="open_in_new"></q-icon>
                        </div>
                        <div class="q-mt-md">
                            Metaforce can perform a quick salesforce deployment to any target org by few clicks! And you can aslo view difference between source org and target org before the deployment starts. It's exciting, right?
                            <div class="q-mt-sm">Metaforce deployment provides following core options:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">Choose Deployment Items</b> - Find and Choose changed metadata items by one click!</li>
                                <li><b :class="`text-${featuredTabColor}`">Diff View</b> - Preview differences and avoid unexpected metadata override in your target org.</li>
                                <li><b :class="`text-${featuredTabColor}`">Test Level</b> - Set a apex test execution level. It's same with standard changeset.</li>
                                <li><b :class="`text-${featuredTabColor}`">Deploy Type</b> - 3 types are supported: Deploy, Validate Only, Destructive. With "Destructive" option, you can delete metadata items from the production.</li>
                                <li><b :class="`text-${featuredTabColor}`">Real-Time Status</b> - Monitor your deployment in real-time and check deployment results in detail.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/deployments-demo.jpg')" class="rounded-borders cursor-pointer" src="~assets/images/deployments-demo.jpg" />
                    </div>
                </q-tab-panel>

                <q-tab-panel name="Data Operations" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mr-md">
                        <q-icon color="teal" size="md" name="webhook"></q-icon>
                    </div>
                    <div class="col q-pr-sm">
                        <div class="text-h5 text-teal hover-underline" @click="openUrl('https://docs.metaforce.ltd/#/pages/coreFeatures/dataOperations')">
                            Simplify Your Data Migration
                            <q-icon :color="featuredTabColor" size="xs" name="open_in_new"></q-icon>
                        </div>
                        <div class="q-mt-md">
                            Metaforce makes salesforce data migration to be easier! You can easily start a <a href="https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_quickstart.htm" target="_blank">Bulk API 2.0</a> job to import/export data. We also provide an easy way to sync data between your objects directly without exporting them.
                            <div class="q-mt-sm">Metaforce Data Operations provides following core actions:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">Export</b> - Export object data by few clicks!</li>
                                <li><b :class="`text-${featuredTabColor}`">Import</b> - Insert/Update/Upsert CSV data into the object!</li>
                                <li><b :class="`text-${featuredTabColor}`">Data Migration</b> - Sync object records from Org A to Org B directly!</li>
                                <!-- <li><b :class="`text-${featuredTabColor}`">Hierarchical Data Migration</b> - Sync hierarchical object records from Org A to Org B!</li> -->
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/data-demo.jpg')" class="rounded-borders cursor-pointer" src="~assets/images/data-demo.jpg" />
                    </div>
                </q-tab-panel>

                <q-tab-panel name="Flow Organizer" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mr-md">
                        <q-icon color="deep-purple-9" size="md" name="account_tree"></q-icon>
                    </div>
                    <div class="col q-pr-sm">
                        <div class="text-h5 text-deep-purple-9 hover-underline" @click="openUrl('https://docs.metaforce.ltd/#/pages/coreFeatures/flowOrganizer')">
                            Manage all your flow versions
                            <q-icon :color="featuredTabColor" size="xs" name="open_in_new"></q-icon>
                        </div>
                        <div class="q-mt-md">
                            Review all your flows and PBs in one place and organize them by objects, types.
                            <div class="q-mt-sm">Metaforce Flow Organizer provides following core actions:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">Organize Flows</b> - Sync/Search/Filter all your flows and processes!</li>
                                <li><b :class="`text-${featuredTabColor}`">Manage Flows</b> - Open/Del/Activate/Deactivate flow versions!</li>
                                <li><b :class="`text-${featuredTabColor}`">Diff/Analyze Flow Version</b> - Compare and optmize your flows!</li>
                                <li><b :class="`text-${featuredTabColor}`">Monitor Flow Interviews</b> - View failed flow interviews in real-time!</li>
                                <li><b :class="`text-${featuredTabColor}`">Export Flows</b> - Export all your flows as CSV file!</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/flow-demo.jpg')" class="rounded-borders cursor-pointer" src="~assets/images/flow-demo.jpg" />
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <q-video style="height:600px;" src="https://www.youtube.com/embed/dmM-vb7pYpg"></q-video>

        <q-dialog @hide="popupImageName=''" :model-value="isImagePopup">
            <q-card style="max-width:none;width:80vw;">
                <q-img class="rounded-borders" :src="popupImageName" />
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { openURL } from 'quasar'

export default defineComponent({
    name: 'IndexPage',
    data () {
        return {
            featureTabToColor: {
                'Organizations': 'primary',
                'Projects': 'deep-purple-9',
                'Deployments': 'teal',
                'Data Operations': 'cyan-9',
                'Flow Organizer': 'indigo-8'
            },
            focusedFeatureTab: 'Organizations',
            popupImageName: '',
        }
    },
    computed: {
        isImagePopup () { return this.popupImageName.length > 0; },
        featuredTabColor () { return this.featureTabToColor[this.focusedFeatureTab] },
        installButtons () {
            if (this.$q.platform.is.ipad) return [{ icon: 'tablet_mac', label: 'Install from iPad app store', link: 'https://apps.apple.com/us/app/metaforce/id1643287394' }];
            if (this.$q.platform.is.win) return [
                { icon: 'desktop_windows', label: 'Install from microsoft store', link: 'ms-windows-store://pdp/?ProductId=9N9ZD9T6RGZP' }
            ];
            return [{ icon: 'laptop_mac', label: 'Install from mac app store', link: 'itms-apps://apps.apple.com/us/app/metaforce/id1643287394' }];
        }
    },
    methods: {
        openUrl (url) { openURL(url); }
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
.q-tab--active .q-tab__label {
    font-weight: bold;
}
.q-tab__label {
    font-size: 17px;
}
.featured-tab ul li {
    padding: 5px 0px;
}

.contact-us .q-parallax__content {
    display: block;
}
</style>
