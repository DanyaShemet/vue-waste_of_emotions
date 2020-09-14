<template>
  <div class="categories">
    <h4>Все категории</h4>
    <div class="categoty-item" v-for="category in categories" :key="category.id">
      {{ category.title }}
      <i class="material-icons">{{ category.icon }}</i>
      <button @click="deleteCategory" :data-id=category.id>Удалить</button>
      <button @click="showEditableForm" :data-id=category.id>Редактировать</button>
    </div>
    <div class="action-buttons action-buttons-category">
      <button @click="showCreatableForm" class="action-emotion " v-if="!isEditable"  :class="(isCreatable || isEditable) ? 'minus minus-category' : 'plus-category plus'">{{(isCreatable || isEditable) ? '-' : '+'}}</button>
      <button @click="hideEditableForm" class="action-emotion minus minus-category" v-if="isEditable" >-</button>
    </div>
    <CreateCategory @created="addNewCategory" :icons="categoryIcons" v-if="isCreatable" :categories="categories"/>
    <EditCategory v-if="isEditable" :category="editableCategory"  :icons="categoryIcons" @updated="updateCategories" />
  </div>
</template>

<script>
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'

export default {
  data: () => ({
    categoryIcons: ['brightness_3', 'accessibility' ,'audiotrack', 'child_care','directions_run'],
    categories: [],
    isEditable: false,
    editableCategory: {},
    updateCount: 0,
    isCreatable: false
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
  },
  methods: {
    async addNewCategory(category) {
      this.categories.push(category)
      this.isCreatable = false
    },
     updateCategories(category){
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].icon = category.icon
       this.isEditable = false
    },
    async deleteCategory(e) {
      let catId = e.target.dataset.id
      await this.$store.dispatch('deleteCategory', catId)
      if (this.categories.length > 1){
        let cat = this.categories.filter(c => {
          return c.id !== catId
        })
        this.categories = [...cat]
        console.log(this.categories)
      }else{
        this.categories = []

      }
    },
    async showEditableForm(e){
      this.isCreatable = false
      let catId = e.target.dataset.id
      this.isEditable = true
      let category = await this.$store.dispatch('fetchCategoryById', catId)
      this.editableCategory = {
        id: category.id,
        title: category.title,
        icon: category.icon,
      }
    },
    showCreatableForm(){
      this.isCreatable = !this.isCreatable
    },
    hideEditableForm(){
      this.isEditable = false
    }
  },
  name: 'categories',
  components: {
    CreateCategory, EditCategory
  }
}
</script>

<style lang="scss">

.action-buttons-category button{
  margin-right: 0 !important;
  width: 38px;
  height: 38px;
  font-size: 18px;
}
.plus-category{
  border: 1px solid #000 !important;
  width: 38px;
  height: 38px;
  font-size: 18px;
  &:focus{
      background-color: #fff;
   }
}

</style>
