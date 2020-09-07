<template>
    <div>
        <h4>Создание категории</h4>
        <form @submit.prevent="submitHandler">
            <input type="text" placeholder="Введите название категории" v-model="title">
            <div class="input-field col s12">
                <select ref="select" v-model="icon">
                    <option value="" disabled selected>Виберите иконку</option>
                    <option value="brightness_3"><i class="material-icons">brightness_3</i></option>
                    <option value="accessibility"><i class="material-icons">accessibility</i></option>
                    <option value="audiotrack"><i class="material-icons">audiotrack</i></option>
                    <option value="child_care"><i class="material-icons">child_care</i></option>
                    <option value="directions_run"><i class="material-icons">directions_run</i></option>
                </select>
            </div>
            <button>Создать категорию</button>
        </form>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";

    export default {
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
                    this.icon = ''

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