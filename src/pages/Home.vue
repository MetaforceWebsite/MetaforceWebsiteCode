<template>
    <q-page>
        <q-parallax style="height:700px" :speed="1" :src="require('assets/home-bg.png')" class="text-white text-center">
            <div class="text-h2 text-bold q-mb-md">Welcome To Metaforce World</div>
            <div class="text-h6 q-ma-xl q-px-xl q-pt-md">Metaforce is a powerful salesforce adminstration and development tool <br />which helps you to manage and customize your salesforce organizations faster and easier!</div>
            <!--  <div class="user-guide-links text-h6 q-mb-lg q-px-xl">
                <a target="_blank" href="https://allen-li.notion.site/Organizations-4350afbe73f040d2b25531020b983cee">Manage Organizations</a> |
                <a target="_blank" href="https://allen-li.notion.site/Projects-be46c2c8c1bd4942a99224cb173fad96">Projects (Apex Code Editor)</a> |
                <a target="_blank" href="https://allen-li.notion.site/Deployments-fbda9eed87bd43a4a68c1146d6b4f840">Metadata Deployments</a> |
                <a target="_blank" href="https://allen-li.notion.site/Data-Manager-c397c2ba17a94e08a63a0b594dc41366">Data Export/Import</a>
            </div> -->
            <div class="q-mt-xl">
                <q-btn class="q-px-xl q-py-sm q-ma-md" style="background-color:rgba(2,123,227,0.8);" type="a" target="_blank" href="/" size="md" flat icon="laptop" label="Install For Mac OS"></q-btn>
                <q-btn class="bg-grey-6 q-px-xl q-py-sm q-ma-md" type="a" target="_blank" href="/" size="md" flat icon="tablet_mac" label="Install For IPAD(Coming Soon...)" disable></q-btn>
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
                        <div class="text-h5 text-primary">Manage Org Connections</div>
                        <div class="q-mt-md">
                            In Metaforce, you can connect and manage all your salesforce organizations via <a href="https://oauth.net/2/" target="_blank">OAuth 2.0 protocol</a>.
                            <div class="q-mt-sm">Once connected, you can perform handy actions below:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">Quick Login</b> - Access your salesforce org by one click! No password needed any more!</li>
                                <li><b :class="`text-${featuredTabColor}`">Copy Login Link</b> - Share a login link to grant temporary access to people you trust.</li>
                                <li><b :class="`text-${featuredTabColor}`">Copy Access Token</b> - Get access token for calling salesforce api or other integration purpose.</li>
                                <li><b :class="`text-${featuredTabColor}`">Set New Password</b> - Set a new password directly for the user in your org.</li>
                                <li><b :class="`text-${featuredTabColor}`">Secret Notes</b> - Keep secret notes under your organization, like password, security token, etc.</li>
                                <li><b :class="`text-${featuredTabColor}`">Revoke Connection</b> - Revoke metaforce connection.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/project-demo.jpg')" class="rounded-borders cursor-pointer" src="~assets/images/orgs-demo.jpg" />
                    </div>
                </q-tab-panel>

                <q-tab-panel name="Projects" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mt-xs q-mr-md">
                        <q-icon color="deep-purple-9" size="sm" name="handyman"></q-icon>
                    </div>
                    <div class="col q-pr-sm">
                        <div class="text-h5 text-deep-purple-9">Build Projects To Start SFDC Dev</div>
                        <div class="q-mt-md">
                            In Metaforce, you can create a project to start your salesforce development just by few clicks! <br />Metaforce provides its own code editor to view and update your apex/page/aura/lwc code directly. It's <span class="text-bold">FASTER AND EASIER</span> than sfdx tool in visual studio code!
                            <div class="q-mt-sm">Metaforce Project provides following core actions:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">Save To Salesforce</b> - Save metadata to salesforce org, like apex code, vf page, aura, lwc, etc.</li>
                                <li><b :class="`text-${featuredTabColor}`">Refresh From Salesforce</b> - Refresh and Get latest metadata from salesforce org.</li>
                                <li><b :class="`text-${featuredTabColor}`">Run Apex Test</b> - You can run apex test class and check test result by one click!</li>
                                <li><b :class="`text-${featuredTabColor}`">View Test Coverage</b> - View the code coverage for apex class you tested.</li>
                                <li><b :class="`text-${featuredTabColor}`">View Diff</b> - Show a code diff view between source org and target org. </li>
                                <li><b :class="`text-${featuredTabColor}`">View Dependencies</b> - Show all references for selected component.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/project-demo.jpg')" class="rounded-borders cursor-pointer" src="~assets/images/project-demo.jpg" />
                    </div>
                </q-tab-panel>

                <q-tab-panel name="Deployments" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mt-xs q-mr-md">
                        <q-icon color="teal" size="md" name="rocket"></q-icon>
                    </div>
                    <div class="col q-pr-sm">
                        <div class="text-h5 text-teal">Deploy Metadata Changes In Real Time</div>
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

                <q-tab-panel name="Data Manager" class="row q-py-xl featured-tab">
                    <div class="col-auto q-mr-md">
                        <q-icon color="teal" size="md" name="webhook"></q-icon>
                    </div>
                    <div class="col q-pr-sm">
                        <div class="text-h5 text-teal">Simplify Your Data Migration</div>
                        <div class="q-mt-md">
                            Metaforce makes salesforce data migration to be easier! You can easily start a <a href="https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_quickstart.htm" target="_blank">Bulk API 2.0</a> job to import/export data. We also provide an easy way to sync data between your objects directly without exporting them.
                            <div class="q-mt-sm">Metaforce Data Manager provides following core actions:</div>
                            <ul class="q-mt-xs">
                                <li><b :class="`text-${featuredTabColor}`">Export</b> - Export object data by few clicks!</li>
                                <li><b :class="`text-${featuredTabColor}`">Import</b> - Insert/Update/Upsert CSV data into the object!</li>
                                <li><b :class="`text-${featuredTabColor}`">Data Migration</b> - Sync object records from Org A to Org B directly!</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <q-img @click="popupImageName=require('assets/images/data-demo.jpg')" class="rounded-borders cursor-pointer" src="~assets/images/data-demo.jpg" />
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </div>

        <q-parallax :speed="0.99" :src="require('assets/home-bg.png')" class="contact-us text-white text-center">
            <div class="row q-pa-xl">
                <div class="col text-center">
                    <div class="text-h4 text-bold q-pb-md">Submit A Case</div>
                    <q-form v-if="!caseId" ref="caseForm" @submit="submitForm">
                        <q-card flat class="q-pa-md" style="background-color:rgba(0,0,0,0.1)">
                            <q-input v-model="caseForm.name" label-color="white" color="white" label="Your Name" lazy-rules :rules="[ val => val && val.length > 0 || 'Required']"></q-input>
                            <q-input v-model="caseForm.email" type="email" label-color="white" color="white" label="Email Address" lazy-rules :rules="[ val => val && val.length > 0 || 'Required']"></q-input>
                            <q-input v-model="caseForm.subject" label-color="white" color="white" label="Case Subject" lazy-rules :rules="[ val => val && val.length > 0 || 'Required']"></q-input>
                            <q-input v-model="caseForm.details" type="textarea" autogrow label-color="white" color="white" label="Case Details" lazy-rules :rules="[ val => val.trim() && val.length > 0 || 'Required']"></q-input>
                            <div class="q-mt-sm">
                                <q-btn :loading="isSubmitting" type="submit" class="bg-primary" flat label="Submit"></q-btn>
                            </div>
                        </q-card>
                    </q-form>
                    <div v-else class="text-h6 q-mt-lg">
                        <div class="q-mb-sm">Congrats!</div>
                        <div>Your case has been submitted to us and we will get back to you ASAP.</div>
                        <div>Case Id: {{caseId}}</div>
                    </div>
                </div>
                <div class="col text-center q-ml-xl q-mt-md">
                    <!-- <q-parallax src="~assets/contact-us.png"></q-parallax> -->
                    <q-img style="width:300px;" class="rounded-borders cursor-pointer" src="~assets/contact-us.png" />
                </div>
            </div>
        </q-parallax>

        <q-dialog @hide="popupImageName=''" :model-value="isImagePopup">
            <q-card style="max-width:none;width:80vw;">
                <q-img class="rounded-borders" :src="popupImageName" />
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { api } from 'src/boot/axios';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'IndexPage',
    data () {
        return {
            featureTabToColor: {
                'Organizations': 'primary',
                'Projects': 'deep-purple-9',
                'Deployments': 'teal',
                'Data Manager': 'cyan-9'
            },
            focusedFeatureTab: 'Organizations',
            popupImageName: '',

            caseForm: { name: '', email: '', subject: '', details: '' },
            isSubmitting: false,
            caseId: ''
        }
    },
    computed: {
        isImagePopup () { return this.popupImageName.length > 0; },
        featuredTabColor () { return this.featureTabToColor[this.focusedFeatureTab] }
    },
    methods: {
        submitForm () {
            this.isSubmitting = true;
            this.$refs.caseForm.validate().then(async success => {
                if (success) {
                    this.caseId = (await api.post('/website/contactus/', this.caseForm))?.data;
                }
                this.isSubmitting = false;
            }).catch(ex => {
                this.isSubmitting = false;
            })
        }
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
