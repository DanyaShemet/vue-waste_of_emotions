<template>
  <div class="statistic container">
    <h4>Статистика</h4>
    <!--    <Loader/>-->
    <BigLoader v-if="loading"/>
    <div v-else-if="records.length">
      <table >
        <thead>
        <tr>
          <th>#</th>
          <th>Кол-во</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th></th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(record, idx) in records" :key="record.id">
          <td class="index">{{ +idx + 1 }}</td>
          <td class="count">{{ record.countEmotions }} <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5997 2.78263C15.8283 4.49369 17.2051 7.59033 15.8828 9.88071C14.5604 12.1711 7.11561 16.2604 4.82523 14.9381C2.53486 13.6157 2.32184 8.13067 3.64419 5.8403C4.96654 3.54993 9.30937 1.46028 11.5997 2.78263Z" fill="black" fill-opacity="0.5"/>
            <path d="M6.44704 6.87065C7.62774 7.34856 8.01241 8.21288 7.64345 8.85194C7.27449 9.491 5.19641 10.6315 4.55685 10.2623C3.9173 9.89304 3.85731 8.36228 4.22627 7.72322C4.59524 7.08416 5.80748 6.5014 6.44704 6.87065Z" fill="white"/>
            <path d="M9.81251 12.1933C9.15936 12.0026 8.90873 11.5636 9.07076 11.2039C9.23278 10.8442 10.2766 10.126 10.6363 10.288C10.996 10.45 11.1096 11.2609 10.9475 11.6206C10.7855 11.9803 10.1722 12.3554 9.81251 12.1933Z" fill="white"/>
            <path d="M11.7075 4.80767C12.5259 5.78373 12.46 6.72749 11.8344 7.1187C11.2087 7.50991 8.8384 7.54198 8.44689 6.9158C8.05537 6.28963 8.72068 4.90971 9.34637 4.51851C9.97206 4.1273 11.316 4.1815 11.7075 4.80767Z" fill="white"/>
          </svg>
          </td>
          <td>{{ new Date(record.date).toLocaleDateString() }}</td>
          <td class="category">{{ record.categoryTitle }} <i class="material-icons">{{ record.icon }}</i></td>
          <td :class="record.type === 'outcome' ? 'lost' : 'add'">{{ record.type === 'outcome' ? '-' : '+' }}</td>
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
<style scoped lang="scss">

button{
  &:focus{
    background-color: transparent;
  }
}
.loader{
  margin-top: 13px;
}
div.active{
  visibility: visible;
}
div.done{
  visibility: hidden;
}
th{
  font-size: 15px;
  color: #C0C0C0;
  font-weight: 400;
}
td{
  color: #000;
  font-weight: 500;
  font-size: 18px;
  &.count{
    svg{
      margin-left: 5px;
    }
  }
  &.index{
    color: #C0C0C0;
  }
  &.category{
    i {
      margin-left: 5px;
    }
  }
  &.lost{
    color: #C10E0E;
    font-size: 30px;
  }
  &.add{
    color: #048053;
    font-size: 30px;
  }
}

@media screen and (max-width: 768px){
  .statistic{
    margin-top: 70px;
  }
  td, th{
    padding: 7px 5px;
  }
  th{
    font-size: 12px;
    color: #C0C0C0;
    font-weight: 400;
  }
  td {
    color: #000;
    font-weight: 400;
    font-size: 14px;
  }
}
</style>
