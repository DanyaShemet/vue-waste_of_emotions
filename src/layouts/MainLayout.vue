<template>
  <div><div class="menu">
    <router-link to="/categories" active-class="active">Категории</router-link>
    <router-link to="/main" active-class="active">Главная</router-link>
    <router-link to="/statistic" active-class="active">Статистика</router-link>
  </div>
    <div class="container">
      main-layout

      <div class="app-main-layout" >
        <main class="app-content ">
          <div class="app-page">
            <router-view/>
          </div>
        </main>
      </div>
      <button @click="logout">Выйти</button>
    </div></div>


</template>

<script>
    export default{
        name: 'main-layout',
        methods: {
            async logout(){
                await this.$store.dispatch('logout')
                this.$router.push('/')
            }
        },
        async mounted() {
            if (!Object.keys(this.$store.getters.info).length) {
                await this.$store.dispatch('fetchInfo')
            }
        }
    }
</script>

<style lang="scss">
  .menu{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    a{
      color: #fff;
      font-size: 16px;
      height: 98%;
      display: flex;
      align-items: center;
      padding: 0 40px;
      border: 1px solid transparent;
      transition: all .3s;
      border-radius: 4px;
      &.active{
        border: 1px solid #fff;
      }
    }
  }
</style>
