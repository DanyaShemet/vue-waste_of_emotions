<template>
  <div class="form" @click="hideForm">

    <form class="" @submit.prevent="submitHandler" @click="(e) => {e.stopPropagation()}" >
      <h5>Регистрация</h5>
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

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите имя</small>
      </div>

      <button class="">Зарегистрироваться</button>
      <button @click="">Гугл</button>
    </form>

  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import firebase from "firebase/app";

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)},
    name: {required}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      try {
        await this.$store.dispatch('registerUser', formData)
        this.$router.push('/main')
      } catch (e) {
      }
    },
    hideForm() {
      this.$emit('hide', 'true')
    }
  },
  mounted() {

  },

}

</script>