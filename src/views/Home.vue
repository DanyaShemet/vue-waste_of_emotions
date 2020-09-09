<template>
    <div>
        <ButtonsLog/>
        <button @click="googleHandler">Гугл</button>
    </div>

</template>

<script>
    // @ is an alias to /src
    import ButtonsLog from '@/components/intro/ButtonsLog'
    import messages from "../utils/messages";
    import firebase from "firebase/app";

    export default {
        name: 'home',
        components: {
            ButtonsLog
        },
        computed: {
            error() {
                return this.$store.getters.error
            }
        },
        methods: {
            async googleHandler(){
                let provider = new firebase.auth.GoogleAuthProvider();
                let isAuthentication = false;
                try {
                    let result = await firebase.auth().signInWithPopup(provider)
                    var token = result.credential.accessToken;
                    var user = result.user;
                    isAuthentication = true
                    let formDataGoogle = {
                        email: user.email,
                        password: user.uid,
                        name: user.displayName
                    }
                    await this.$store.dispatch('loginGoogleUser', formDataGoogle)
                    this.$router.push('/main')

                }catch (e) {
                    var errorCode = e.code;
                    var errorMessage = e.message;
                    var email = e.email;
                    var credential = e.credential;
                }
            }
        },
        mounted() {
            M.updateTextFields();
            if (messages[this.$route.query.message]){
                this.$message(messages[this.$route.query.message])
            }
        },
        watch: {
            error(fbError){
                this.$error(messages[fbError.code] || 'Что то пошло не так')
            }
        }
    }
</script>
