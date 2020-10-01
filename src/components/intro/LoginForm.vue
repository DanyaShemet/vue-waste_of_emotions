<template>
  <div class="form" @click="hideForm">
    <form @submit.prevent="submitHandler" @click="(e) => {e.stopPropagation()}">
      <h5>Вход по Email</h5>
      <div class="row">
        <div class="input-field  s12">
          <input id="email" type="email"
                 v-model="email"
                 :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Введите
            email</small>
          <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Некоректный
            email</small>
        </div>
      </div>
      <div class="row">
        <div class="input-field  s12">
          <input id="password" type="password" v-model="password"
                 :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">Пароль</label>
          <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введите
            пароль</small>
          <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Минимальная
            длинна {{ $v.password.$params.minLength.min }}</small>
        </div>
      </div>

      <button class="" type="submit">Войти</button>
      <p class="or">Или воспользуйтесь Google</p>
      <button @click="$emit('google')" type="button">
        <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" x="0px" y="0px" width="20" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
            <g>
              <g id="glass">
                <path
                    d="M286.875,229.5v63.75h150.45c-15.3,89.25-86.7,153-175.95,153c-104.55,0-191.25-86.7-191.25-191.25    s86.7-191.25,191.25-191.25c53.55,0,99.45,22.95,132.6,58.65l45.9-45.9c-45.9-45.9-107.1-76.5-178.5-76.5    c-140.25,0-255,114.75-255,255s114.75,255,255,255s242.25-114.75,242.25-255v-25.5H286.875z"/>
              </g>
            </g>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)},
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/main')
      } catch (e) {
      }

    },
    hideForm(){
      this.$emit('hide', 'true')
    }


  },
  mounted() {

  },

}

</script>

<style lang="scss">


</style>