<template>
  <div class="categories">
    <h4>Все категории</h4>
    <div class="categoty-item" v-for="category in categories" :key="category.id">
      {{ category.title }}
      <i class="material-icons">{{ category.icon }}</i>
      <button @click="deleteCategory" :data-id=category.id>Удалить</button>
      <button @click="showEditableForm" :data-id=category.id>Редактировать</button>
    </div>
    <CreateCategory @created="addNewCategory" :icons="categoryIcons"/>
    <EditCategory v-if="isEditable" :categoryName="editableCategory.title" :categoryIcon="editableCategory.icon" :icons="categoryIcons"/>
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
    editableCategory: {}
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    async deleteCategory(e) {
      let catId = e.target.dataset.id
      await this.$store.dispatch('deleteCategory', catId)
      this.categories = await this.$store.dispatch('fetchCategories')
    },
    async showEditableForm(e){
      let catId = e.target.dataset.id
      this.isEditable = true
      let category = await this.$store.dispatch('fetchCategoryById', catId)
      this.editableCategory ={
        id: category.id,
        title: category.title,
        icon: category.icon,
      }

    }
  },
  name: 'categories',
  components: {
    CreateCategory, EditCategory
  }
}
</script>
