import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig =  {
    apiKey: "AIzaSyCAWhomXNuXhKtna4geqqGMX9pzHKV6e_0",
    authDomain: "golden-torch-132723.firebaseapp.com",
    databaseURL: "https://golden-torch-132723.firebaseio.com",
    projectId: "golden-torch-132723",
    storageBucket: "golden-torch-132723.appspot.com",
    messagingSenderId: "1075177953395",
    appId: "1:1075177953395:web:39b1c6f6fce21c861d7206"
  };

firebase.initializeApp(firebaseConfig)
store.commit('SET_DATABASE', firebase.firestore())

export default firebase