<template>
  <div class="create-category" ref="create">
    <h4>Создание категории</h4>
    <form @submit.prevent="submitHandler">
      <input type="text" placeholder="Введите название категории, например: Семья; Друзья; Работа" v-model="title"
             :class="{invalid: ($v.title.$dirty && !$v.title.required) || ($v.title.$dirty && !$v.title.minLength) || ($v.title.$dirty && !$v.title.maxLength)}">
      <h5>Выберите подходящую иконку</h5>
      <div class="category-buttons">

        <button class="icon-item" ref="buttons" type="button" @click="chooseIcon" v-for="icon in icons" :id="icon">
          <i class="material-icons">{{ icon }}</i>
        </button>

      </div>

      <button class="plus-category action-emotion" :disabled="loading">+</button>
    </form>
    <p v-if="isCopy" class="error">Категория с таким именем уже есть, не стоит ее дублировать</p>
    <p v-else-if="$v.title.$dirty && !$v.title.required" class="error">Введите название категории</p>
    <p v-else-if="$v.title.$dirty && !$v.title.maxLength" class="error">Название категории слишком длинное, максимум 10 символов</p>
    <p v-else-if="$v.title.$dirty && !$v.title.minLength" class="error">Название категории слишком короткое, минимум 2 символа</p>
    <p v-else-if="isError.icon" class="error">Выберите иконку</p>
    <Loader v-if="loading" class=" mt-10"/>
  </div>
</template>

<script>
import {required, minLength,maxLength} from "vuelidate/lib/validators";

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
    title: {required, minLength: minLength(2), maxLength: maxLength(10)},
  },
  mounted() {
    window.scrollBy({
      top: this.$refs.create.getBoundingClientRect().top,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped lang="scss">

h4{
  color: #C0C0C0;
  font-size: 20px;
  text-align: left;
  font-weight: 500;
  margin-bottom: 0px;
}
h5{
  font-weight: 400;
  font-size: 15px;
  color: #C0C0C0;
}
input{
  border-bottom: 2px solid #000 !important;
  font-weight: 500;
  font-size: 18px;
  &::placeholder{
    font-weight: 400;
  }
  &:focus{
    box-shadow: none !important;
  }
}
.plus-category {
  display: block;
  margin: 0 auto;
}
.plus-category {
  border: 1px solid #000 !important;
  width: 38px;
  height: 38px;
  font-size: 18px;

&:focus {
   background-color: #fff;
 }
}

form{
  margin-bottom: 20px;
}
@media screen and (max-width: 768px){
  .create-category{
    padding-bottom: 100px;
  }
}
</style>