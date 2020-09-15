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
      <button @click="showCreatableForm" class="action-emotion" v-if="!isEditable"
              :class="isCreatable ? 'minus minus-category' : 'plus-category plus'">{{ isCreatable ? '-' : '+' }}
      </button>
      <button @click="hideEditableForm" class="action-emotion minus minus-category" v-if="isEditable">-</button>
    </div>
    <CreateCategory @created="addNewCategory" :icons="categoryIcons" v-if="isCreatable" :categories="categories"/>
    <EditCategory v-if="isEditable" :category="editableCategory" :icons="categoryIcons" @updated="updateCategories"
                  :categories="categories" :key="isRerender"/>
  </div>
</template>

<script>
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'

export default {
  data: () => ({
    categoryIcons: [
      'brightness_3',
      'rowing',
      'accessibility',
      'audiotrack',
      'child_care',
      'directions_run',
      'emoji_events',
      'delete',
      'touch_app',
      'hot_tub',
      'casino',
      'cake',
      'school',
      'sick',
      'emoji_food_beverage',
      'beach_access',
      'duo',
      'tv',
      'headset',
      'airplanemode_active',
      'brightness_5',
      'videogame_asset',
      'color_lens',
      'videogame_asset',
      'sports_bar',
      'euro_symbol',
      'pool',
      'alternate_email',
      'center_focus_strong',
      'play_circle_filled',
    ],
    categories: [],
    isEditable: false,
    editableCategory: {},
    updateCount: 0,
    isCreatable: false,
    isRerender: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    let userIcons = []
    this.categories.forEach(el => {
      userIcons.push(el.icon)
    })
    for (let i of userIcons) {
      const idxOfCategoryIcons = this.categoryIcons.findIndex(s => s === i)
      this.deleteIcons(idxOfCategoryIcons)
    }
  },
  methods: {
    deleteIcons(idx) {
      this.categoryIcons.splice(idx, 1)
    },
    async addNewCategory(category) {
      this.categories.push(category)
      this.isCreatable = false
      this.categoryIcons = this.categoryIcons.filter(icon => icon !== category.icon)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categoryIcons.push(this.categories[idx].icon)
      this.categories[idx].title = category.title
      this.categories[idx].icon = category.icon
      this.categoryIcons = this.categoryIcons.filter(icon => icon !== category.icon)
      this.isEditable = false
    },
    async deleteCategory(e) {
      let catId = e.target.dataset.id
      const idx = this.categories.findIndex(c => c.id === catId)
      this.categoryIcons.push(this.categories[idx].icon)
      await this.$store.dispatch('deleteCategory', catId)
      if (this.categories.length > 1) {
        let cat = this.categories.filter(c => {
          return c.id !== catId
        })
        this.categories = [...cat]
      } else {
        this.categories = []
      }
    },
    async showEditableForm(e) {
      this.idRerender += 1
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
    showCreatableForm() {
      this.isCreatable = !this.isCreatable
    },
    hideEditableForm() {
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

.action-buttons-category button {
  margin-right: 0 !important;
  width: 38px;
  height: 38px;
  font-size: 18px;
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

</style>
