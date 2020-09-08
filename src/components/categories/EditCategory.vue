<template>
  <div>
    <h4>Редактирование категории</h4>
    {{ title }}
    {{ $props.categoryIcon }}

<!--    <i class="material-icons">{{$props.category.icon}}</i>-->
    <form @submit.prevent="updateCategory">
      <input type="text" placeholder="Введите название категории" v-model="title">
      <div class="input-field col s12">
        <select ref="selectedit" v-model="icon">
          <option value="" disabled>Виберите иконку</option>
          <option :value=icon selected> <i class="material-icons">{{icon}}</i></option>
          <option value="brightness_3"><i class="material-icons">brightness_3</i></option>
          <option value="audiotrack"><i class="material-icons">audiotrack</i></option>
          <option value="child_care"><i class="material-icons">child_care</i></option>
          <option value="directions_run"  ><i class="material-icons">directions_run</i></option>
        </select>
      </div>
      <button>Обновить</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['categoryName', 'categoryIcon'],
  data: () => ({
    select: null,
    icon: '',
    title: this.categoryName
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