<template>
    <q-dialog v-model="isShowLogin">
        <q-card class="row" style="max-width:none;min-width:700px;max-width:900px;width:70%;">
            <div class="col-5" style="min-height:500px;">
                <q-carousel arrows animated v-model="slide" height="100%" class="gradient-bg" transition-prev="slide-right" transition-next="slide-left" navigation-position="top" navigation infinite autoplay>
                    <q-carousel-slide name="first" style="width:100%;">
                        <div class="absolute-top custom-caption q-py-xl text-center text-white" style="height:100%;background-color:rgba(0,0,0,0.3);">
                            <div class="q-mt-xl text-h3 text-bold">Metaforce</div>
                            <div class="text-h5 q-mt-xl" style="line-height:2em;">
                                Manage <br />all your salesforce orgs
                                <div>In One Place</div>
                            </div>
                        </div>
                        <div class="text-center text-white q-pb-md absolute-bottom">
                            <a class="hover-underline" @click="openExternalLink('https://metaforce.ltd')">https://metaforce.ltd</a>
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="second" style="width:100%;">
                        <div class="absolute-top custom-caption q-py-xl text-center text-white" style="height:100%;background-color:rgba(0,0,0,0.3);">
                            <div class="q-mt-xl text-h4 text-bold">Metaforce Project</div>
                            <div class="text-h5 q-mt-xl" style="line-height:2em;">
                                <div>BE A MASTER</div>
                                <div>OF</div>
                                <div>Salesforce Development</div>
                            </div>
                        </div>
                        <div class="text-center text-white q-pb-md absolute-bottom">
                            <a class="hover-underline" @click="openExternalLink('https://metaforce.ltd')">https://metaforce.ltd</a>
                        </div>
                    </q-carousel-slide>

                    <q-carousel-slide name="third" style="width:100%;">
                        <div class="absolute-top custom-caption q-py-xl text-center text-white" style="height:100%;background-color:rgba(0,0,0,0.3);">
                            <div class="q-mt-xl text-h4 text-bold">Metaforce Deployment</div>
                            <div class="text-h5 q-mt-xl" style="line-height:2em;">
                                <div>Find + Compare + Deploy</div>
                                <div>Metadata Changes</div>
                                <div>Via</div>
                                <div>A Few Clicks</div>
                            </div>
                        </div>
                        <div class="text-center text-white q-pb-md absolute-bottom">
                            <a class="hover-underline" @click="openExternalLink('https://metaforce.ltd')">https://metaforce.ltd</a>
                        </div>
                    </q-carousel-slide>

                    <q-carousel-slide name="four" style="width:100%;">
                        <div class="absolute-top custom-caption q-py-xl text-center text-white" style="height:100%;background-color:rgba(0,0,0,0.3);">
                            <div class="q-mt-xl text-h4 text-bold">Flow Explorer</div>
                            <div class="text-h5 q-mt-xl" style="line-height:2em;">
                                <div>View + Search + Analyze</div>
                                <div>+ Manage</div>
                                <div>All Salesforce Flows</div>
                                <div>In One Place</div>
                            </div>
                        </div>
                        <div class="text-center text-white q-pb-md absolute-bottom">
                            <a class="hover-underline" @click="openExternalLink('https://metaforce.ltd')">https://metaforce.ltd</a>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
            <q-card square class="col-7">
                <div>
                    <q-tabs v-model="currentTabName" align="left" active-bg-color="primary" active-color="white" indicator-color="primary" class="bg-grey-2" inline-label no-caps>
                        <q-tab name="SignInTab" icon="home" label="Sign In" class="col" />
                        <q-tab name="SignUpTab" icon="add_circle_outline" label="Sign Up" class="col" />
                    </q-tabs>
                    <div class="q-ma-md">
                        <q-form ref="formCmp">
                            <div class="q-my-xl text-center text-h4">
                                {{isSignIn ? "Welcome back!" : "Create your account"}}
                            </div>

                            <template v-if="!isSignIn">
                                <q-input v-model="form.firstname" label="First Name" class="q-mb-lg" :rules="nameRules" lazy-rules="ondemand" autofocus outlined hide-bottom-space>
                                    <template v-slot:prepend><q-icon name="person" /></template>
                                </q-input>
                                <q-input v-model="form.lastname" label="Last Name" :rules="nameRules" lazy-rules="ondemand" outlined hide-bottom-space>
                                    <template v-slot:prepend><q-icon name="person" /></template>
                                </q-input>
                            </template>

                            <q-input v-model="form.email" label="Email address" type="email" class="q-my-lg" :rules="emailRules" lazy-rules="ondemand" autofocus outlined hide-bottom-space>
                                <template v-slot:prepend><q-icon name="email" /></template>
                            </q-input>
                            <q-input v-model="form.verificationCode" label="Verification Code" input-class="verification-code-input" type="number" outlined hide-bottom-space>
                                <template v-slot:prepend><q-icon name="pin" /></template>
                                <template v-slot:after>
                                    <q-btn @click="requestVerificationCode" :disabled="statusOfRequestCode != 'Draft'" :loading="statusOfRequestCode=='Sending'" class="bg-primary text-white" style="height:55px;" flat no-caps>
                                        <div>{{statusOfRequestCode == "Sent" ? 'Sent' : "Request Code"}}</div>
                                    </q-btn>
                                </template>
                            </q-input>
                            <q-item v-if="statusOfRequestCode =='Sent'" class="text-positive q-pl-none">
                                <q-item-section>
                                    <q-item-label>The verification code has been sent to {{form.email}}.</q-item-label>
                                    <q-item-label caption>
                                        <q-icon name="help_outline"></q-icon>
                                        Didn't receive a code? Resend the code in {{countDown}} seconds.
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <div class="text-center q-mt-xl">
                                <q-btn :loading="isSubmitting" @click="submitForm" size="lg" color="primary" class="bg-primary text-white" no-caps flat>
                                    <template v-slot:loading>
                                        <q-spinner-bars size="xs"></q-spinner-bars>
                                    </template>
                                    <div class="row justify-center" style="width:150px;">
                                        <span>{{isSignIn ? "Sign In" : "Sign Up"}}</span>
                                        <q-icon name="arrow_circle_right" class="q-pl-md" />
                                    </div>
                                </q-btn>
                            </div>
                        </q-form>
                    </div>
                </div>
            </q-card>
        </q-card>
    </q-dialog>
</template>

<script>
import { post } from 'src/common/request';
import { notifyError } from 'src/common/notify';
import { METAFORCE_SERVICE_URL_REQUEST_CODE, METAFORCE_SERVICE_URL_VERIFY_CODE, METAFORCE_SERVICE_URL_CUSTOMER } from 'src/common/constants';
import { useCustomerStore } from 'src/stores/customer';

export default {
    data () {
        return {
            slide: "first",
            isShowLogin: false,

            currentTabName: "SignInTab",
            countDown: 60,
            countDownTimer: null,
            isSubmitting: false,

            form: { firstname: "", lastname: "", email: "", verificationCode: "" },
            statusOfRequestCode: "Draft", //Draft, Sending, Sent

            nameRules: [val => (val && val.length > 0) || 'Required'],
            emailRules: [
                val => {
                    if (val) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return (val && emailRegex.test(val)) || 'Invalid Email Address'
                    } else {
                        return 'Required';
                    }
                }
            ]
        }
    },
    computed: {
        isSignIn () { return this.currentTabName == "SignInTab"; },
    },
    methods: {
        showLogin () { this.isShowLogin = true; },
        async requestVerificationCode () {
            let isValid = await this.$refs.formCmp.validate();
            if (isValid) {
                try {
                    this.statusOfRequestCode = "Sending";
                    this.form.verificationCode = "";

                    let result = await post(METAFORCE_SERVICE_URL_REQUEST_CODE, {
                        firstname: this.form.firstname,
                        lastname: this.form.lastname,
                        email: this.form.email,
                    });
                    if (result.isSuccess) {
                        this.statusOfRequestCode = "Sent";
                        this.startCountDown();
                    } else {
                        this.statusOfRequestCode = "Draft";
                        notifyError(result.message);
                    }
                } catch (ex) {
                    this.statusOfRequestCode = "Draft";
                }
            }
        },
        startCountDown () {
            this.countDown = 60;
            this.countDownTimer = setInterval(() => {
                this.countDown--;
                if (this.countDown <= 0) {
                    this.statusOfRequestCode = "Draft";
                    clearInterval(this.countDownTimer);
                }
            }, 1000);
        },
        async submitForm () {
            if (!this.form.verificationCode.trim()) {
                notifyError('Verification code is missing!');
                return;
            }

            let isValid = await this.$refs.formCmp.validate();
            if (!isValid) return;

            try {
                this.isSubmitting = true;
                let result = await post(METAFORCE_SERVICE_URL_VERIFY_CODE, {
                    firstname: this.form.firstname,
                    lastname: this.form.lastname,
                    email: this.form.email,
                    verificationCode: this.form.verificationCode
                });
                if (result.isSuccess) {
                    useCustomerStore().updateLoginToken(result.message);
                    useCustomerStore().updateCustomer(result.customer);
                    this.isShowLogin = false;
                } else {
                    notifyError(result.message);
                }
            } catch (ex) {
                notifyError(ex);
            } finally {
                this.isSubmitting = false;
            }
        }
    },
    mounted () {
        this.$bus.off('showLogin');
        this.$bus.on('showLogin', this.showLogin);
    }
}
</script>
<style scoped>
:deep(.verification-code-input) {
    font-size: 20px;
    letter-spacing: 10px;
}

.gradient-bg {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    height: 100%;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.btn-grad {
    background-image: linear-gradient(to right, #1a2980 0%, #26d0ce 51%, #1a2980 100%);
}
.btn-grad {
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
}

.btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}
</style>