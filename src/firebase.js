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

export const useAuth = () => {

  const createUser = (name, email, contact, type) => {
    return fire.firestore().collection("user").add({ name, email, contact, type });
  }

  const signIn = (email, password) => {
    return fire.auth().signInWithEmailAndPassword(email, password).then(
    ).catch(err => {
      return err.code
    })
  }

  const signUp = (name, contact, typeOfUser, email, password) => {
    return fire.auth().createUserWithEmailAndPassword(email, password).then(
      () => {
        createUser(name, email, contact, typeOfUser);
      }
    )
  }

  const findUser = (email) => {
    return fire.firestore().collection("user").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      });
      const userFetched = users.find((user) => {
        if (user.email === email) {
          return user
        };
      })
      localStorage.setItem('userInfo', JSON.stringify(userFetched));
    })
  }

  return { signIn, signUp, findUser }
}

export const useQuery = () => {

}