import firebase from "firebase/app";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid');
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
                await firebase.database().ref(`/users/${uid}/info`).set({
                    outcomeCount: info.outcomeCount || 0,
                    incomeCount: info.incomeCount || 0,
                    emotions: info.incomeCount - info.outcomeCount || 0,
                    name: info.name,
                    sort: info.sort

                })
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
                    outcomeCount: 0,
                    incomeCount: 0,
                    emotions: 0,
                    name,
                    sort: 'all'
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
                if (info){
                    await firebase.database().ref(`/users/${password}/info`).set({
                        outcomeCount: info.outcomeCount,
                        incomeCount: info.incomeCount,
                        emotions: info.incomeCount - info.outcomeCount,
                        name,
                        sort: info.sort
                    })
                    console.log('info')
                }else{
                    await firebase.database().ref(`/users/${password}/info`).set({
                        outcomeCount: 0,
                        incomeCount: 0,
                        emotions: 0,
                        name,
                        sort: 'all'
                    })
                    console.log('info-0')
                }
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