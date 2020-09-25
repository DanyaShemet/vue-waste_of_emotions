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

      <button class="">Войти</button>
      <button @click="">Гугл</button>
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

.form {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 30%;
    background-color: #fff;
    border: 3px solid #000;
    border-radius: 10px;
    padding: 15px;

    h5{
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
    }
    button{
      border: 2px solid #000;
      font-weight: 600;
      font-size: 18px;
      border-radius: 10px;
      width: 200px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      &:hover{
        width: 220px;
        border: 2px solid #000;
      }
    }
    label{
      color: #000;
      &.active{
        color: #c0c0c0 !important;
      }
    }
    small{
      color: #C10E0E !important;
    }
  }
}
</style>