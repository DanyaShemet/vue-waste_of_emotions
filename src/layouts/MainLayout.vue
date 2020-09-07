<template>
    <div class="container">
        main-layout
        <div class="menu">
            <router-link to="/categories">Категории</router-link>
            <router-link to="/main">Главная</router-link>
            <router-link to="/statistic">Статистика</router-link>
        </div>
        <div class="app-main-layout" >
            <main class="app-content ">
                <div class="app-page">
                    <router-view/>
                </div>
            </main>
        </div>
        <button @click="logout">Выйти</button>
    </div>

</template>

<script>
    export default{
        name: 'main-layout',
        methods: {
            async logout(){
                await this.$store.dispatch('logout')
                this.$router.push('/')
            }
        }
    }
</script>
