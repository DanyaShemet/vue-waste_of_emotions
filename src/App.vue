<template>
    <div id="app">
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
    import MainLayout from './layouts/MainLayout'
    import HomeLayout from './layouts/HomeLayout'

    export default {

        components: {MainLayout, HomeLayout},
        computed: {
            layout() {
                return (this.$route.meta.layout + '-layout' || '')
            }
        }

    }

</script>

<style lang="scss">
    @import "~materialize-css/dist/css/materialize.min.css";
</style>
