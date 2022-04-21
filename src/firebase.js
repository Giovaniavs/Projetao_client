import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB93zECVF4aVS79iPHcHtFtPYh4VNUCLVM",
  authDomain: "projetao-seguranca.firebaseapp.com",
  projectId: "projetao-seguranca",
  storageBucket: "projetao-seguranca.appspot.com",
  messagingSenderId: "1012192256692",
  appId: "1:1012192256692:web:8efc1846d70b2f96ae6de1",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export const db = fire.firestore();

export const useAuth = () => {
  const createUser = (name, email, contact, type) => {
    return fire
      .firestore()
      .collection("user")
      .add({ name, email, contact, type })
      .then((response) => {
        const { id: uid } = response;
        localStorage.setItem("uid", email);
      });
  };

  const signIn = (email, password) => {
    return fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const { email } = response.user;
        localStorage.setItem("uid", email);
      })
      .catch((err) => {
        return err.code;
      });
  };

  const signUp = (name, contact, typeOfUser, email, password) => {
    return fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        createUser(name, email, contact, typeOfUser);
      });
  };

  const findUser = (email) => {
    return fire
      .firestore()
      .collection("user")
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        const userFetched = users.find((user) => {
          if (user.email === email) {
            return user;
          }
        });
        localStorage.setItem("userInfo", JSON.stringify(userFetched));
        localStorage.setItem("uid", email);
      });
  };

  const getUserProfile = async (email) => {
    return db.collection("user").doc(email).get();
  };

  const getUserDocs = async (email) => {
    return db.collection("user").doc(email).collection("docs");
  };

  const getUserEvaluations = async (email) => {
    return db.collection("user").doc(email).collection("evaluations");
  };

  return {
    signIn,
    signUp,
    findUser,
    getUserProfile,
    getUserDocs,
    getUserEvaluations,
  };
};

export const useQuery = () => {
  const uid = localStorage.getItem("uid");

  const getGroups = async () => {
    let groupList = [];
    await fire
      .firestore()
      .collection("groups")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          groupList = [...groupList, { id: doc.id, ...doc.data() }];
        });
      });
    return groupList.filter((group) => group.users.includes(uid));
  };

  const getOccurrences = async () => {
    let occurrences = [];
    await fire
      .firestore()
      .collection("occurrences")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          occurrences = [...occurrences, { id: doc.id, ...doc.data() }];
        });
      });
    return occurrences.filter((occurrence) => occurrence.users.includes(uid));
  };

  const getGuards = async () => {
    let guardList = [];
    await fire
      .firestore()
      .collection("guards")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().validado) {
            guardList = [...guardList, doc.data()];
          }
        });
      });
    return guardList;
  };

  return { getGroups, getGuards, getOccurrences }
}
