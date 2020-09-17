import firebase from "firebase/app";


  const firebaseConfig = {
    apiKey: "AIzaSyAByBhw3NKgxT5EDWZH4v38PZfVCrP24VA",
    authDomain: "birthdayappreact.firebaseapp.com",
    databaseURL: "https://birthdayappreact.firebaseio.com",
    projectId: "birthdayappreact",
    storageBucket: "birthdayappreact.appspot.com",
    messagingSenderId: "991172952661",
    appId: "1:991172952661:web:81a21bbbd3a797d9060adc"
  };

  //To be used in otherComponents
  export default firebase.initializeApp(firebaseConfig);
