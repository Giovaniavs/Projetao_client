import firebase from "firebase"
import "firebase/firestore"


var firebaseConfig = {
  apiKey: "AIzaSyCxXpuRv3hOcEH6bVqwBS3d9LixnBSEvGE",
  authDomain: "projetao-seguranca-client.firebaseapp.com",
  projectId: "projetao-seguranca-client",
  storageBucket: "projetao-seguranca-client.appspot.com",
  messagingSenderId: "657063684926",
  appId: "1:657063684926:web:4f4db33407527d54695a6f"
};

  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;     