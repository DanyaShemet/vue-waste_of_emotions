<template>
    <Login/>
</template>

<script>
    // @ is an alias to /src
    import Login from '@/components/ButtonsLog'
    import messages from "../utils/messages";
    export default {
        name: 'Home',
        components: {
            Login
        },
        computed: {
            error() {
                return this.$store.getters.error
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
                console.log(fbError)
                this.$error(messages[fbError.code] || 'Что то пошло не так')
            }
        }
    }
</script>
