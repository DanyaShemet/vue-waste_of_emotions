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
        async loginGoogleUser({dispatch, commit}, {email, password, name}){
            try{
                const info = (await firebase.database().ref(`/users/${password}/info`).once('value')).val();
                console.log(info)
                await firebase.database().ref(`/users/${password}/info`).set({
                    name,
                    emotions: info.emotions || 0
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