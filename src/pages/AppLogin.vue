<template>
    <div class="q-pb-xs">
        <login-form @onLoginSuccess="loginSuccess"></login-form>
    </div>
</template>

<script>
import loginForm from 'src/components/loginForm.vue'
export default {
    components: { loginForm },
    data () {
        return {
        }
    },
    methods: {
        loginSuccess (data) {
            window.parent.postMessage({ type: 'login_credential', data }, "*");
        },
    }
}
</script>
