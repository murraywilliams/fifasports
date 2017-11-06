import firebase from 'firebase';
  
const config = {
apiKey: "AIzaSyC2eaXf41tMCeob5eUms2YNs5vK6St5-m8",
authDomain: "fifa-sports.firebaseapp.com",
databaseURL: "https://fifa-sports.firebaseio.com",
projectId: "fifa-sports",
storageBucket: "",
messagingSenderId: "979950095703"
};
firebase.initializeApp(config);

export default firebase;