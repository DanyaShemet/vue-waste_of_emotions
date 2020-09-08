<template>
  <div>
    <h4>Редактирование категории</h4>
    {{ title }}
    {{ $props.categoryIcon }}

<!--    <i class="material-icons">{{$props.category.icon}}</i>-->
    <form @submit.prevent="updateCategory">
      <input type="text" placeholder="Введите название категории" >
      <div class="input-field col s12">
        <select ref="selectedit" >
          <option value="" disabled>Виберите иконку</option>
          <option v-for="icon in icons" :value="icon" :selected="icon === $props.categoryIcon"><i class="material-icons">{{icon}}</i></option>
        </select>
      </div>
      <span><i class="material-icons">{{$props.categoryIcon}}</i></span>
      <button>Обновить</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['categoryName', 'categoryIcon', 'icons'],
  data: () => ({
    select: null,
    icon: '',
    title: ''
  }),

  methods: {
    updateCategory() {
      const formData = {
        title: this.title
      }
      console.log(formData)
    }
  },
  computed: {
    // title(){
    //   return this.categoryName
    // }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.selectedit)
    M.updateTextFields()

  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>