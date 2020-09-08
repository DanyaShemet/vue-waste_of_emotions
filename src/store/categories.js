import firebase from "firebase/app";
export default {
    actions: {
        async createCategory({commit, dispatch}, {title,icon}){
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`users/${uid}/categories`).push({title, icon})
                return {
                    title,icon, id: category.key
                }

            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async deleteCategory({commit, dispatch}, catId){
            const uid = await dispatch('getUid')
            const category = await firebase.database().ref(`users/${uid}/categories/`).child(catId).remove()
        },

        async fetchCategoryById({commit, dispatch}, id){
            try {
                const uid = await dispatch('getUid')
                const category = (await firebase.database().ref(`users/${uid}/categories`).child(id).once('value')).val() || {};
                return {
                    ...category, id
                }
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategories({commit, dispatch}){
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {};
                return Object.keys(categories).map(key => ({...categories[key], id: key}))

            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}