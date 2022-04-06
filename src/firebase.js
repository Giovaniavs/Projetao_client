import firebase from "firebase"
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB93zECVF4aVS79iPHcHtFtPYh4VNUCLVM",
  authDomain: "projetao-seguranca.firebaseapp.com",
  projectId: "projetao-seguranca",
  storageBucket: "projetao-seguranca.appspot.com",
  messagingSenderId: "1012192256692",
  appId: "1:1012192256692:web:8efc1846d70b2f96ae6de1"
};

  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;     