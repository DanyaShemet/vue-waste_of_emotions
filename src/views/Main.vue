<template>
  <div class="about">
    <h1>Главная</h1>
    <p>Имя {{ this.info.name }}</p>
    <p>Баланс: {{ this.info.emotions }} емоций</p>
    <p>Потрачено {{ this.info.outcomeCount }}</p>
    <p>Заработано {{ this.info.incomeCount }}</p>
    <button @click="showOutcomeForm" >-</button>
    <button @click="showIncomeForm" >+</button>

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
      console.log(!this.chosenIcon)
      console.log(+this.number === 0)
      if (!this.chosenIcon || +this.number === 0){
        console.log('Напиши кол-во эмоций и выбери иконку')
        return
      }
      const record = {
        categoryId: this.chosenIcon,
        type: this.type,
        countEmotions: +this.number,
        date: new Date().toJSON(),
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
      if (!this.chosenIcon || +this.number === 0 ){
        console.log('Напиши кол-во эмоций и выбери иконку')
        return
      }

      const record = {
        categoryId: this.chosenIcon,
        type: this.type,
        countEmotions: +this.number,
        date: new Date().toJSON()
      }


      if (this.canCreateRecord ) {
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
    }

  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
  },


}
</script>
