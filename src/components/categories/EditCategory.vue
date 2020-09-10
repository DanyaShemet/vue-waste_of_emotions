<template>
  <div>
    <h4>Редактирование категории {{ $props.category.title }} <i class="material-icons">{{
        $props.category.icon
      }}</i>
    </h4>
    <form @submit.prevent="updateCategory">
      <input type="text" placeholder="Введите название категории" :value="$props.category.title" ref="textupdate">
      <p>Иконка {{ $props.category.icon }} - <i class="material-icons">{{ $props.category.icon }}</i></p>
      <button class="icon-item" ref="buttons" type="button" @click="chooseIcon" v-for="icon in icons" :id="icon"
              :class="$props.category.icon === icon ? 'selected' : ''">
        <i class="material-icons">{{ icon }}</i>
        <span v-if="$props.category.icon === icon">В</span>
      </button>

      <button>Обновить</button>
    </form>

  </div>
</template>

<script>
export default {
  props: ['category', 'icons'],
  data: () => ({
    select: null,
    chosenIcon: ''
  }),
  methods: {
    chooseIcon(e) {
      this.$refs.buttons.forEach(el => el.classList.remove('selected'))
      e.target.classList.add('selected')
      this.chosenIcon = e.target.id
    },
    async updateCategory() {
      if (this.$refs.textupdate.value === '') {
        return
      }
      try {
        const formData = {
          id: this.category.id,
          title: this.$refs.textupdate.value,
          icon: this.chosenIcon || this.category.icon
        }
        await this.$store.dispatch('updateCategory', formData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', formData)
      } catch (e) {
      }
    },
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.iconupdate)
    M.updateTextFields()

  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>

<style>

</style>