<template>
  <div class="main">
    <div class="settings" @click="showSortMenu" :class="sortMenu ? 'active': ''">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M35.09 23.7234C35.1633 23.1734 35.2 22.605 35.2 22C35.2 21.4134 35.1633 20.8267 35.0716 20.2767L38.7933 17.38C39.1233 17.1234 39.215 16.6284 39.0133 16.2617L35.4933 10.175C35.2733 9.77169 34.815 9.64336 34.4116 9.77169L30.03 11.5317C29.1133 10.835 28.1416 10.2484 27.06 9.80836L26.4 5.15169C26.3266 4.71169 25.96 4.40002 25.52 4.40002H18.48C18.04 4.40002 17.6916 4.71169 17.6183 5.15169L16.9583 9.80836C15.8766 10.2484 14.8866 10.8534 13.9883 11.5317L9.60664 9.77169C9.20331 9.62502 8.74498 9.77169 8.52498 10.175L5.02331 16.2617C4.80331 16.6467 4.87664 17.1234 5.24331 17.38L8.96498 20.2767C8.87331 20.8267 8.79998 21.4317 8.79998 22C8.79998 22.5684 8.83664 23.1734 8.92831 23.7234L5.20664 26.62C4.87664 26.8767 4.78498 27.3717 4.98664 27.7384L8.50664 33.825C8.72664 34.2284 9.18498 34.3567 9.58831 34.2284L13.97 32.4684C14.8866 33.165 15.8583 33.7517 16.94 34.1917L17.6 38.8484C17.6916 39.2884 18.04 39.6 18.48 39.6H25.52C25.96 39.6 26.3266 39.2884 26.3816 38.8484L27.0416 34.1917C28.1233 33.7517 29.1133 33.165 30.0116 32.4684L34.3933 34.2284C34.7966 34.375 35.255 34.2284 35.475 33.825L38.995 27.7384C39.215 27.335 39.1233 26.8767 38.775 26.62L35.09 23.7234ZM22 28.6C18.37 28.6 15.4 25.63 15.4 22C15.4 18.37 18.37 15.4 22 15.4C25.63 15.4 28.6 18.37 28.6 22C28.6 25.63 25.63 28.6 22 28.6Z"
            fill=""/>
      </svg>
    </div>

    <SortMenu  :class="{novisible: !sortMenu}" @showBalancePerDay="showBalancePerDay" :sort="this.info.sort" @showAllBalance="showAllBalance"
               @hide="showSortMenu"/>



<!--    <button @click="showBalancePerDay" :class="this.info.sort === 'day' ? 'selected' : ''">Показать за день</button>-->
    <button>Показать за 7 дней</button>
<!--    <button @click="showAllBalance" :class="this.info.sort === 'all' ? 'selected' : ''">Показать за все время</button>-->
    <p>Имя {{ this.info.name }}</p>
    <p :class="this.info.emotions < 0  ? 'red' : 'green'">Баланс: {{ this.info.emotions }} емоций</p>
    <p>Потрачено {{ this.info.outcomeCount }}</p>
    <p>Заработано {{ this.info.incomeCount }}</p>
    <div class="action-buttons" v-if="categories.length">
      <button @click="showOutcomeForm" class="minus-emotion action-emotion">-</button>
      <button @click="showIncomeForm" class="plus-emotion action-emotion">+</button>
    </div>
    <div v-else>У вас нет ни одной категории
      <router-link to="/categories">Добавить категории</router-link>
    </div>


    <div v-if="type === 'outcome'">
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
import SortMenu from '@/components/main/SortMenu'

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
  components: {
    SortMenu
  },
  data: () => ({
    type: '',
    number: 0,
    categories: [],
    chosenIcon: null,
    records: [],
    sortMenu: false
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
    showSortMenu(){
      this.sortMenu = !this.sortMenu
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

    },
    async showBalancePerDay() {
      this.showSortMenu()
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
      this.showSortMenu()
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
.action-emotion {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 25px;

  &.minus-emotion {
    background-color: #000;
    color: #fff;
    margin-right: 20px;

    &:focus {
      background-color: #000;
    }
  }

  &.plus-emotion {
    border: 3px solid #000;

    &:focus {
      background-color: #fff;
    }
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.settings {
  cursor: pointer;
  position: absolute;
  left: 40px;
  top: 40px;
  z-index: 1;
  transition: all .4s;
  svg{
    fill: black;
    transition: all .2s;
    &:hover{
      fill: #C0C0C0;
    }
  }
  &.active{
    left: 12%;
  }
}

</style>
