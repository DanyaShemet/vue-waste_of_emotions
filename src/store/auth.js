import firebase from "firebase/app";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }catch (e){
                commit ('setError', e)
                throw e
            }
        },
        async logout(){
            await firebase.auth().signOut()
        },
        async registerUser({dispatch, commit}, {email, password, name}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/info`).set({
                    emotions: 100,
                    name
                })
            }catch (e){
                commit ('setError', e)
                throw e
            }
        },
        async registerGoogleUser({dispatch, commit}, {email, password, name}){
            try{
                await firebase.database().ref(`/users/${password}/info`).set({
                    emotions: 100,
                    name
                })
            }catch (e) {
                commit('setError', e)
                throw e
            }

        },
        getUid(){
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}