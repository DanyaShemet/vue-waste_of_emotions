import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Categories from '../views/Categories.vue'
import Statistic from '../views/Statistic.vue'
import * as firebase from "firebase";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {layout: "home"},
        component: Home
    },
    {
        path: '/main',
        name: 'Profile',
        meta: {layout: "main", auth: true},
        component: Main,
    },
    {
        path: '/categories',
        name: 'categories',
        meta: {layout: "main", auth: true},
        component: Categories
    },
    {
        path: '/statistic',
        name: 'statistic',
        meta: {layout: "main", auth: true},
        component: Statistic
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.auth)

    if (requireAuth && !currentUser){
        next('./?message=signin')
    }else{
        next()
    }


});
export default router
