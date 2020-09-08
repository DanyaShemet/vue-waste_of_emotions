<template>
    <div>
        <h4>Создание категории</h4>
        <form @submit.prevent="submitHandler">
            <input type="text" placeholder="Введите название категории" v-model="title">
            <div class="input-field col s12">
                <select ref="select" v-model="icon">
                    <option value="" disabled selected>Виберите иконку</option>
                  <option v-for="icon in icons" :value="icon"><i class="material-icons">{{icon}}</i> </option>
                </select>
            </div>
          <span><i class="material-icons">{{icon}}</i></span>
            <button>Создать категорию</button>
        </form>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";

    export default {
      props: ['icons'],
        data: () => ({
            title: '',
            icon: '',
        }),
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    const category = await this.$store.dispatch('createCategory',{
                        title: this.title,
                        icon: this.icon
                    });
                    this.title =  ''
                  this.$refs.select.value = ''

                    this.$v.$reset()
                    this.$message('Категория была создана')
                    this.$emit('created', category)
                } catch (e) {}
            }
        },
        validations: {
            title: {required},
        },
        mounted() {
            M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        },
    }
</script>