<template>
    <q-page class="q-ma-xl">
        <div class="text-h3 text-bold q-mb-lg">
            <div class="q-pb-lg">Privacy Policy</div>
            <q-separator></q-separator>
        </div>

        <div>
            <p>Last updated: September 22, 2024</p>
            <p>This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use the service and tells you about your privacy rights and how the law protects you.</p>
            <p>We use your personal data to provide and improve the service. By using the service, you agree to the collection and use of information in accordance with this privacy policy.</p>
        </div>

        <div class="q-my-lg">
            <p class="text-h5 text-bold">Data Collection</p>
            <p class="text-h6">Personal Data</p>
            <div>
                <div>While using our service, we may ask you to provide personal information that can be used to contact or identify You.</div>
                <div>Personally identifiable information may include, but is not limited to:</div>
                <ul>
                    <li>Email address</li>
                    <li>First name and last name</li>
                </ul>
            </div>
            <p class="text-h6">Usage Data</p>
            <p>Usage data is collected automatically when using the service.</p>
            <p>Usage data may include information such as your device type (windows/mac), app version, the pages of our service that you visit, the count of your visit, unique device identifiers and other diagnostic data.</p>
            <p>Our service generates an unique UUID for your device and send it back to our server for tracking purpose.</p>

            <p class="text-h6">Purpose of Personal and Usage Data</p>
            <ul>
                <li>To improve and maintain our service, including to monitor the usage of our Service.</li>
                <li>To provide you with news, special offers and general information about our services.</li>
            </ul>

            <p class="text-h6">Security of Personal and Usage Data</p>
            <div>
                Your personal and usage data are securely stored on our salesforce organization instance server.
            </div>
        </div>
        <div class="q-my-lg">
            <p class="text-h5 text-bold">Data Storage and Security</p>
            <ul>
                <li>Metaforce is a local development/admin tool. All your salesforce resources in metaforce are securely stored on your computer. You can update or delete your local data at any time.</li>
                <li>All outbound requests(salesforce feature related) from the app are based on standard salesforce rest/tooling/metadata apis and are sent to your salesforce orgs directly.</li>
            </ul>
        </div>
        <div class="q-my-lg">
            <p class="text-h5 text-bold">Legal Basis for Processing</p>
            <div>
                We process your data based on your consent when you use our app.
            </div>
        </div>
        <div class="q-my-lg">
            <p class="text-h5 text-bold">Data Sharing</p>
            <div>
                We do not share your personal data with third parties under any circumstances.
            </div>
        </div>

        <div class="q-my-lg">
            <p class="text-h5 text-bold">Contact Us</p>
            <div>
                <div>If you require any form of assistance, whether it's regarding product information, technical support, or any other matter, please do not hesitate to drop us an email at metaforce.salesforce@gmail.com.</div>
            </div>
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
