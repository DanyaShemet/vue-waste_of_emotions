import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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
        name: 'Main',
        meta: {layout: "main", auth: true},
        component: () => import('../views/Main')
    },
    {
        path: '/categories',
        name: 'Categories',
        meta: {layout: "main", auth: true},
        component: () => import('../views/Categories')
    },
    {
        path: '/statistic',
        name: 'Statistic',
        meta: {layout: "main", auth: true},
        component: () => import('../views/Statistic')
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
