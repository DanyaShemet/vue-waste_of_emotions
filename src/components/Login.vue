<template>
  <button id="login" @click="loginHandler()">Login</button>
</template>


<script>
  export default {
    data: () => ({
      isLoginForm: false,
      isRegisterForm: false,
    }),
    methods: {
      loginHandler(){
        if (!this.isLoginForm){
          let div = document.createElement('div')
          div.classList.add('popup-wrap')
          div.insertAdjacentHTML('beforeend', `
          <h2>Login</h2>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" class="validate">
                <label for="email">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="password" type="password" class="validate">
                <label for="password">Password</label>
              </div>
            </div>
          </form>
        `)
          document.body.appendChild(div)
          this.isLoginForm = true;
        }
      }
    }
  }

</script>


<style lang="scss">

</style>