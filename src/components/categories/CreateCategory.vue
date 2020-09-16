<template>
  <div>
    <h4>Создание категории</h4>
    <form @submit.prevent="submitHandler">
      <input type="text" placeholder="Введите название категории" v-model="title"
             :class="{invalid: ($v.title.$dirty && !$v.title.required) || ($v.title.$dirty && !$v.title.minLength)}">
      <div class="category-buttons">
        <button class="icon-item" ref="buttons" type="button" @click="chooseIcon" v-for="icon in icons" :id="icon">
          <i class="material-icons">{{ icon }}</i>
        </button>

      </div>

      <button class="plus-category action-emotion" :disabled="loading">+</button>
    </form>
    <p v-if="isCopy" class="error">Категория с таким именем уже есть, не стоит ее дублировать</p>
    <p v-if="$v.title.$dirty && !$v.title.required" class="error">Введите коректное название категории</p>
    <p v-if="isError.icon" class="error">Выберите иконку</p>
    <Loader v-if="loading"/>
  </div>
</template>

<script>
import {required, minLength} from "vuelidate/lib/validators";

export default {
  props: ['icons', 'categories'],
  data: () => ({
    title: '',
    icon: null,
    isCopy: false,
    isError: {
      icon: false
    },
    loading: false
  }),
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (!this.icon) {
        this.isError.icon = true
        return
      } else {
        this.isError.icon = false
      }

      for (let category of this.categories) {
        if (category.title.trim().toLowerCase() === this.title.trim().toLowerCase()) {
          this.isCopy = true
          return
        }
        this.isCopy = false
      }
      try {
        if (!this.isCopy) {
          this.loading = true
          const category = {
            title: this.title,
            icon: this.icon
          }
          await this.$store.dispatch('createCategory',category);
          this.title = ''
          this.$v.$reset()
          this.$message('Категория была создана')
          this.loading = false
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
    title: {required, minLength: minLength(2)},
  },
}
</script>

<style scoped>
.plus-category {
  display: block;
  margin: 0 auto;
}
form{
  margin-bottom: 20px;
}
</style>