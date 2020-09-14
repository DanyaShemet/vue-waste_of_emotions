<template>
  <div class="categories">
    <h4>Статистика</h4>
    <table v-if="records.length">
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{+idx + 1 }}</td>
        <td>{{record.countEmotions}}</td>
        <td>{{new Date(record.date).toLocaleDateString()}}</td>
        <td>{{record.categoryTitle}} <i class="material-icons">{{record.icon}}</i></td>
        <td>{{record.type}}</td>

      </tr>
      </tbody>
    </table>
    <div v-else>У вас нет ни одной записи <router-link to="/main">Добавить запись</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'statistic',
  data: () => ({
    records: [],
    categories: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    const records  = this.records.map(record => {
      return {
        ...record,
        categoryTitle: this.categories.find(c => c.id === record.categoryId).title,
        icon: this.categories.find(c => c.id === record.categoryId).icon
      }
    })
    this.records = records
  },
  computed: {

  }
}

</script>

