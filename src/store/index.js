import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import categories from './categories'
import info from "./info";
import records from "./records";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state, error) {
            state.error = null
        }
    },
    actions: {},
    modules: {
        auth,categories,info,records
    },
    getters: {
        error: s => s.error
    }
})
