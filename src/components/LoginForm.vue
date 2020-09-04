<template>
    <div class="row">
        <h2>Login</h2>
        <form class="col s8" @submit.prevent="submitHandler">
            <div class="row">
                <div class="input-field col s12">
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
                <div class="input-field col s12">
                    <input id="password" type="password" v-model="password"
                           :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                    >
                    <label for="password">Password</label>
                    <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введите
                        пароль</small>
                    <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Минимальная
                        длинна {{$v.password.$params.minLength.min}}</small>
                </div>
            </div>

            <button class="waves-effect waves-light btn">button</button>
        </form>
    </div>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'

    export default {
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
                    this.$router.push('/profile')
                } catch (e) {
                }

            },

        },
        mounted() {

        },

    }

</script>