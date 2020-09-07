<template>
    <div>
      <button @click="loginHandler('log')">Login</button>
      <button @click="loginHandler('reg')">Register</button>
      <LoginForm  v-if="isLoginForm"/>
      <RegisterForm  v-if="isRegisterForm"/>
    </div>
</template>


<script>
import LoginForm from "@/components/intro/LoginForm";
import RegisterForm from "@/components/intro/RegisterForm";
  export default {
    name: 'buttons',
    data: () => ({
      isLoginForm: false,
      isRegisterForm: false,
    }),
    components: {
      LoginForm, RegisterForm
    },
    methods: {
      loginHandler(e){
        if (e === 'log'){
          this.isLoginForm = true
          this.isRegisterForm = false
        }
        if (e === 'reg'){
          this.isRegisterForm = true
          this.isLoginForm = false
        }

      }
    },
  }

</script>


<style lang="scss">

</style>