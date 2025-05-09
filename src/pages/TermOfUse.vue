<template>

    <body>
        <div class="text-h3 text-bold q-mb-lg">
            <div class="q-pb-lg">Terms and Conditions</div>
            <q-separator></q-separator>
        </div>

        <div class="last-updated">Last Updated: <span id="current-date"></span></div>

        <p>Welcome to <strong>Metaforce</strong> ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your use of our website (<a href="https://www.metaforce.ltd">www.metaforce.ltd</a>) and Metaforce application, including subscription services. By accessing or using our website or application, you agree to comply with these Terms. If you do not agree, please refrain from using our Services.</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By using Metaforce, you confirm that you have read, understood, and agreed to these Terms. We reserve the right to modify these Terms at any time, and continued use constitutes acceptance of the updated terms.</p>

        <h2>2. Account Registration</h2>
        <ul>
            <li>You may need to create an account with your email address to access certain features.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>Notify us immediately of any unauthorized account activity.</li>
        </ul>

        <h2>3. Online Payments & Refunds</h2>
        <ul>
            <li>All payments are processed through a secure third-party payment provider "Paddle" (https://www.paddle.com).</li>
            <li>Prices are listed in <strong>USD</strong> and are subject to change without notice.</li>
            <li>Refund policies will be specified at paddle checkout. You can also check it here: <a href="https://www.paddle.com/legal/checkout-buyer-terms">Paddle Checkout Buyer Terms and Conditions</a>.</li>
            <li>Chargebacks or fraudulent transactions may result in account suspension.</li>
        </ul>

        <h2>4. User Responsibilities</h2>
        <p>You agree not to:</p>
        <ul>
            <li>Use Metaforce for illegal or unauthorized purposes.</li>
            <li>Transmit viruses, malware, or harmful code.</li>
            <li>Reverse-engineer or exploit vulnerabilities in our system.</li>
            <li>Violate intellectual property rights.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <ul>
            <li>All content (logos, text, graphics, software) on Metaforce is owned by us or licensed to us.</li>
            <li>Unauthorized use, reproduction, or distribution is prohibited.</li>
        </ul>

        <h2>6. Limitation of Liability</h2>
        <ul>
            <li>Metaforce is provided "as is" without warranties of any kind.</li>
            <li>We are not liable for any direct, indirect, or consequential damages arising from your use of our Services.</li>
            <li>We do not guarantee uninterrupted or error-free service.</li>
        </ul>

        <h2>7. Termination</h2>
        <p>We reserve the right to suspend or terminate your access to Metaforce for violations of these Terms or suspicious activities.</p>

        <!--  <h2>8. Governing Law & Dispute Resolution</h2>
        <ul>
            <li>These Terms are governed by the laws of <strong>[Your Country/State]</strong>.</li>
            <li>Any disputes shall be resolved through arbitration in <strong>[Location]</strong> before pursuing litigation.</li>
        </ul> -->

        <h2>8. Privacy Policy</h2>
        <p>Your data is handled according to our <router-link to="/privacy" class="policy-link">Privacy Policy</router-link>.</p>

        <div class="contact-info">
            <div class="text-h6">Contact Us</div>
            <p>For questions regarding these Terms, please contact: <a href="mailto:metaforce.salesforce@gmail.com">metaforce.salesforce@gmail.com</a>.</p>
        </div>

    </body>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    methods: {

    },
    mounted () {
        document.getElementById('current-date').innerText = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
})
</script>
<style scoped>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    color: #333;
    max-width: 1000px;
    margin: 0 auto;
}
h1 {
    color: #2c3e50;
    margin-bottom: 0px;
    font-size: 3rem;
}
h2 {
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    font-size: 1.5rem;
    margin: 10px;
}
a {
    color: #3498db;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
.last-updated {
    font-style: italic;
    color: #7f8c8d;
    margin-bottom: 30px;
}
.contact-info {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    margin-top: 30px;
}
</style>

