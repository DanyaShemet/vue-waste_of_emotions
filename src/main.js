import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from "vuelidate";
Vue.config.productionTip = false

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';



Vue.use(Vuelidate);



let firebaseConfig = {
  apiKey: "AIzaSyDbFHUPmPEWH4MXl8_H3dI0YZjhepc4fNI",
  authDomain: "waste-of-emotions.firebaseapp.com",
  databaseURL: "https://waste-of-emotions.firebaseio.com",
  projectId: "waste-of-emotions",
  storageBucket: "waste-of-emotions.appspot.com",
  messagingSenderId: "841700064224",
  appId: "1:841700064224:web:11bccc504316aa93ff4985"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(()=>{
  if (!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

