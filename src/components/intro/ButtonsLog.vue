<template>
    <div>
      <button @click="loginHandler('log')">Войти</button>
      <button @click="loginHandler('reg')">Регистрация</button>
      <LoginForm  v-if="isLoginForm"  @hide="hideForm"/>
      <RegisterForm  v-if="isRegisterForm" @hide="hideForm"/>
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

      },
      hideForm(){
        this.isLoginForm = false
        this.isRegisterForm = false
      }

    },
  }

</script>


<style lang="scss">

</style>