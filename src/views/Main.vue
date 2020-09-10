<template>
  <div class="about">
    <button @click="showBalancePerDay" :class="this.info.sort === 'day' ? 'selected' : ''">Показать за день</button>
    <button>Показать за 7 дней</button>
    <button @click="showAllBalance" :class="this.info.sort === 'all' ? 'selected' : ''">Показать за все время</button>
    <h1>Главная</h1>
    <p>Имя {{ this.info.name }}</p>
    <p>Баланс: {{ this.info.emotions }} емоций</p>
    <p>Потрачено {{ this.info.outcomeCount }}</p>
    <p>Заработано {{ this.info.incomeCount }}</p>
    <div class="action-buttons">
      <button @click="showOutcomeForm" class="minus-emotion action-emotion">-</button>
      <button @click="showIncomeForm" class="plus-emotion action-emotion">+</button>
    </div>


    <div v-if="type === 'outcome'">
      {{ type }}
      <form @submit.prevent="outcomeSubmit">
        <input type="number" v-model="number">
        <button type="button" v-for="icon in categories" @click="chooseIcon" ref="buttons" :id="icon.id">
          <i class="material-icons">{{ icon.icon }}</i>
          <span class="icon-text">{{ icon.title }}</span>
        </button>
        <button>Потвердить</button>
      </form>
    </div>

    <div v-if="type === 'income'">
      {{ type }}
      <form @submit.prevent="incomeSubmit">
        <input type="number" v-model="number">
        <button type="button" v-for="icon in categories" @click="chooseIcon" ref="buttons" :id="icon.id">
          <i class="material-icons">{{ icon.icon }}</i>
          <span class="icon-text">{{ icon.title }}</span>
        </button>
        <button>Потвердить</button>
      </form>

    </div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'

export default {
  name: 'main-page',
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.info.emotions < this.number) {
        return
      }
      return this.info.emotions >= this.number
    }
  },
  data: () => ({
    type: '',
    number: 0,
    categories: [],
    chosenIcon: null,
    records: [],
  }),
  methods: {
    chooseIcon(e) {
      this.$refs.buttons.forEach(el => el.classList.remove('selected'))
      e.target.classList.add('selected')
      this.chosenIcon = e.target.id
    },
    showOutcomeForm() {
      this.type = 'outcome'
      this.number = 0
    },
    showIncomeForm() {
      this.type = 'income'
      this.number = 0
    },
    async incomeSubmit() {
      if (!this.chosenIcon || +this.number === 0) {
        console.log('Напиши кол-во эмоций и выбери иконку')
        return
      }
      const record = {
        categoryId: this.chosenIcon,
        type: this.type,
        countEmotions: +this.number,
        date: new Date().toJSON()
      }

      try {
        await this.$store.dispatch('createRecord', record)
        const emotions = {
          incomeCount: this.info.incomeCount + +this.number,
          outcomeCount: this.info.outcomeCount,
          emotions: +this.info.emotions + +this.number
        }
        await this.$store.dispatch('updateInfo', emotions)
        this.$message('Запись создана')

      } catch (e) {
      }
    },

    async outcomeSubmit() {
      if (!this.chosenIcon || +this.number === 0) {
        console.log('Напиши кол-во эмоций и выбери иконку')
        return
      }

      const record = {
        categoryId: this.chosenIcon,
        type: this.type,
        countEmotions: +this.number,
        date: new Date().toJSON()
      }


      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', record)
          const emotions = {
            outcomeCount: this.info.outcomeCount + +this.number,
            incomeCount: this.info.incomeCount,
            emotions: +this.info.emotions - +this.number
          }
          await this.$store.dispatch('updateInfo', emotions)
          this.$message('Запись создана')
        } catch (e) {
        }
      } else {
        this.$error('У вас нету столько эмоций')
      }
    },
    async showBalancePerDay() {
      this.records = await this.$store.dispatch('fetchRecords')
      const emotions = {
        outcomeCount: 0,
        incomeCount: 0,
        emotions: 0,
        sort: 'day'
      }
      const neededDate = this.records.filter(record => {
        return new Date().getDate() === new Date(record.date).getDate()
      })
      neededDate.map(record => {
        if (record.type === 'income') {
          emotions.incomeCount += record.countEmotions
          emotions.emotions += record.countEmotions
        } else if (record.type === 'outcome') {
          emotions.outcomeCount += record.countEmotions
          emotions.emotions -= record.countEmotions
        }
      })

      await this.$store.dispatch('updateInfo', emotions)
    },
    async showAllBalance() {
      this.records = await this.$store.dispatch('fetchRecords')
      const emotions = {
        outcomeCount: 0,
        incomeCount: 0,
        emotions: 0,
        sort: 'all'
      }

      this.records.map(record => {
        if (record.type === 'income') {
          emotions.incomeCount += record.countEmotions
          emotions.emotions += record.countEmotions
        } else if (record.type === 'outcome') {
          emotions.outcomeCount += record.countEmotions
          emotions.emotions -= record.countEmotions
        }
      })

      await this.$store.dispatch('updateInfo', emotions)
    }


  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

  },


}
</script>

<style lang="scss">
.action-emotion{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 25px;
  &.minus-emotion{
    background-color: #000;
    color: #fff;
    margin-right: 20px;
    &:focus{
      background-color: #000;
    }
  }
  &.plus-emotion{
    border: 3px solid #000;
    &:focus{
      background-color: #fff;
    }
  }
}
.action-buttons{
  display: flex;
  justify-content: center;
}

</style>
