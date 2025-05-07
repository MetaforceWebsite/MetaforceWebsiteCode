<template>
    <q-dialog v-model="isShow">
        <q-card style="width:100%;">
            <q-tabs v-model="currentTabName" align="left" active-bg-color="primary" active-color="white" indicator-color="primary" class="bg-grey-2" inline-label no-caps>
                <q-tab name="SignInTab" icon="home" label="Sign In" class="col" />
                <q-tab name="SignUpTab" icon="add_circle_outline" label="Sign Up" class="col" />
            </q-tabs>
            <div class="q-ma-md">
                <q-form ref="formCmp">
                    <div class="q-my-lg text-center text-h5">
                        {{isSignIn ? "Welcome back!" : "Create your account"}}
                    </div>

                    <template v-if="!isSignIn">
                        <q-input v-model="form.firstname" label="First Name" class="q-mb-md" :rules="nameRules" lazy-rules="ondemand" outlined hide-bottom-space>
                            <template v-slot:prepend><q-icon name="person" /></template>
                        </q-input>
                        <q-input v-model="form.lastname" label="Last Name" class="q-mb-md" :rules="nameRules" lazy-rules="ondemand" outlined hide-bottom-space>
                            <template v-slot:prepend><q-icon name="person" /></template>
                        </q-input>
                    </template>

                    <q-input v-model="form.email" label="Email address" type="email" class="q-mb-md" :rules="emailRules" lazy-rules="ondemand" outlined hide-bottom-space>
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

                    <div class="text-center q-mt-lg">
                        <q-btn :loading="isSubmitting" @click="submitForm" color="primary" class="bg-primary text-white" no-caps flat>
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
        </q-card>
    </q-dialog>
</template>

<script>
import { post } from 'src/common/request';
import { notifyError } from 'src/common/notify';
import { METAFORCE_SERVICE_URL_REQUEST_CODE, METAFORCE_SERVICE_URL_VERIFY_CODE } from 'src/common/constants';
import { pageStorage } from 'src/common/utils';

export default {
    data () {
        return {
            isShow: false,
            currentTabName: "SignInTab",
            countDown: 60,
            countDownTimer: null,
            isSubmitting: false,

            form: { firstname: "", lastname: "", email: "allen@gmail.com", verificationCode: "" },
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
        show () { this.isShow = true; },
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
            if (isValid) {
                this.isSubmitting = true;
                let result = await post(METAFORCE_SERVICE_URL_VERIFY_CODE, {
                    firstname: this.form.firstname,
                    lastname: this.form.lastname,
                    email: this.form.email,
                    verificationCode: this.form.verificationCode
                });
                if (result.isSuccess) {
                    pageStorage.setLoginToken(encodeURIComponent(result.message));
                    this.$emit('onLogin');
                    this.isShow = false;
                } else {
                    notifyError(result.message);
                }
                this.isSubmitting = false;
            }
        }
    }
}
</script>
<style lang="scss">
.verification-code-input {
    font-size: 25px;
    letter-spacing: 10px;
}
</style>