<template>
  <div>
    <h4>Создание категории</h4>
    <form @submit.prevent="submitHandler">
      <input type="text" placeholder="Введите название категории" v-model="title">
      <button class="icon-item" ref="buttons" type="button" @click="chooseIcon" v-for="icon in icons" :id="icon">
        <i class="material-icons">{{ icon }}</i>
      </button>
      <button class="plus-category action-emotion">+</button>
    </form>
    <p v-if="isCopy">Категория с таким именем уже есть, не стоит ее дублировать</p>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  props: ['icons', 'categories'],
  data: () => ({
    title: '',
    icon: null,
    isCopy: null
  }),
  methods: {
    async submitHandler() {
      if (this.$v.$invalid || !this.icon) {
        this.$v.$touch()
        return
      }
      this.categories.forEach(el => {
        if (el.title.toLowerCase() === this.title.toLowerCase()) {
          this.isCopy = true
        } else {
          this.isCopy = false
        }
      })
      try {
        if (!this.isCopy){
          const category = await this.$store.dispatch('createCategory', {
            title: this.title,
            icon: this.icon
          });
          this.title = ''

          this.$v.$reset()
          this.$message('Категория была создана')
          this.isCopy = null
          this.$emit('created', category)
        }
      } catch (e) {
      }
    },
    chooseIcon(e) {
      this.$refs.buttons.forEach(el => el.classList.remove('selected'))
      e.target.classList.add('selected')
      this.icon = e.target.id
    },
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

<style scoped>
.plus-category {
  display: block;
  margin: 0 auto;
}
</style>