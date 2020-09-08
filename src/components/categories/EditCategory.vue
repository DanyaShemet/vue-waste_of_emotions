<template>
  <div>
    <h4>Редактирование категории {{ $props.category.title }} <i class="material-icons">{{ $props.category.icon }}</i>
    </h4>
    <form @submit.prevent="updateCategory">
      <input type="text" placeholder="Введите название категории" :value="$props.category.title" ref="textupdate">
      <p>Иконка {{ $props.category.icon }} - <i class="material-icons">{{ $props.category.icon }}</i></p>

      <div class="input-field col s12">

        <select ref="iconupdate">
          <option value="" disabled selected>Виберите новую иконку</option>
          <option v-for="icon in icons" :value="icon" >
            <i
              class="material-icons" >{{ icon }}</i>
<!--            <span>-->
<!--              {{icon === $props.category.icon  ? 'bold': 'ok'}}-->
<!--            </span>-->
          </option>
        </select>
      </div>
      <button>Обновить</button>
    </form>
  </div>
</template>

<script>

export default {
  props: ['category', 'icons'],
  data: () => ({
    select: null
  }),
  methods: {
    async updateCategory() {
      try {
        const formData = {
          id: this.category.id,
          title: this.$refs.textupdate.value,
          icon: this.$refs.iconupdate.value || this.category.icon
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
.bold {
  font-style: italic;
}
</style>