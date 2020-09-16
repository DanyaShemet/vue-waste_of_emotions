<template>
  <div class="categories">
    <h4>Статистика</h4>
    <!--    <Loader/>-->
    <BigLoader v-if="loading"/>
    <div v-else-if="records.length">
      <table >
        <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th></th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(record, idx) in records" :key="record.id">
          <td>{{ +idx + 1 }}</td>
          <td>{{ record.countEmotions }}</td>
          <td>{{ new Date(record.date).toLocaleDateString() }}</td>
          <td>{{ record.categoryTitle }} <i class="material-icons">{{ record.icon }}</i></td>
          <td>{{ record.type }}</td>
          <td>
            <button @click="deleteRecord" :data-id="record.id"><i class="material-icons">delete</i></button>

          </td>
          <div class="done loader" :id="record.id"> <Loader /></div>
        </tr>

        </tbody>

      </table>
    </div>
    <div v-else class="center">У вас нет ни одной записи
      <router-link to="/main">Добавить запись</router-link>
    </div>


  </div>
</template>

<script>
export default {
  name: 'statistic',
  data: () => ({
    records: [],
    categories: [],
    loading: false,
    deleteLoading: false
  }),
  async mounted() {
    this.loading = true
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    const records = this.records.map(record => {
      return {
        ...record,
        categoryTitle: this.categories.find(c => c.id === record.categoryId).title,
        icon: this.categories.find(c => c.id === record.categoryId).icon
      }
    })
    this.records = records

  },
  methods: {
    async deleteRecord(e) {
      let recordId = e.target.dataset.id
      this.deleteLoading = true
      document.querySelector('#'+recordId).classList.add('active')
      document.querySelector('#'+recordId).classList.remove('done')
      const idx = this.records.findIndex(c => c.id === recordId)
      await this.$store.dispatch('deleteRecords', recordId)
      document.querySelector('#'+recordId).classList.remove('active')
      this.$message('Эмоция была удалена')
      this.deleteLoading = false
      if (this.records.length > 1) {
        let cat = this.records.filter(c => {
          return c.id !== recordId
        })
        this.records = [...cat]
      } else {
        this.records = []
      }

    }
  }
}

</script>
<style>
.loader{
  margin-top: 13px;
}
div.active{
  visibility: visible;
}
div.done{
  visibility: hidden;
}
</style>
