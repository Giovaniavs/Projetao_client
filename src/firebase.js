import "firebase/firestore";
import "firebase/storage";

import firebase from "firebase";

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
export const storage = firebase.storage();

export const useAuth = () => {
  const createUser = async ({ user, images }) => {
    const { name, email, contact, type, description } = user;
    return await fire
      .firestore()
      .collection("user")
      .doc(email)
      .set({
        name,
        email,
        contact,
        type,
        starsCount: 0,
        imgSrc: images.imgSrc,
        description,
        verified: false
      
      })
      .then((response) => true);
  };

  const signIn = (email, password) => {
    // validar se é um usuario da base (do cloud storage)
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

  const signUp = ({ user, images, setIsLoading, setShouldRedirectToLogin }) => {
    const { email, password } = user;
    setIsLoading(true);
    return fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const userCreated = await createUser({ user, images });
        if (userCreated) {
          setIsLoading(true);
          await setDocuments({
            user,
            imageUrl: images.idCard,
            docName: "identidade/registro geral/rg",
          });

          await setDocuments({
            user,
            imageUrl: images.residenceDoc,
            docName: "comprovante residencia",
          });

          await setDocuments({
            user,
            certifications: images.certifications,
          });

          setIsLoading(false);
        }
      });
  };
  const setFeedbacks = (author,feedback,points,email) =>{
    
    db.collection("user")
      .doc(email)
      .collection("feedbacks")
      .add({
        author,
        feedback,
        points
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  const setDocuments = ({ user, imageUrl, docName, certifications }) => {
    if (certifications) {
      var batch = db.batch();
      certifications.forEach((cert, index) => {
        const certRef = db
          .collection("user")
          .doc(user.email)
          .collection("certifications")
          .doc();
        batch.set(certRef, {
          url: cert,
          name: `Certification ${index}`,
        });
      });

      batch
        .commit()
        .then((docRef) => {
          console.log("Certification written with ID: ", docRef);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      return;
    }
 
    db.collection("user")
      .doc(user.email)
      .collection("docs")
      .add({
        url: imageUrl,
        name: docName,
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
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
    return db.collection("user").doc(email).collection("certifications");
  };

  const getUserFeedback = async (email) => {
    return db.collection("user").doc(email).collection("feedbacks");
  };
  const getUserEvaluations = async (email) => {
    return db.collection("user").doc(email).collection("evaluations");
  };

  const updateConnections = (email_guard, email_shopman,nome,status_connection) => {
    db.collection("user")
      .doc(email_guard)
      .collection("connections")
      .doc(email_shopman)
      .update({
        email_shopman,
        nome,
        status_connection , // 0 pendente - 1-> Ok 2-> terminado 
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

      db.collection("user")
      .doc(email_shopman)
      .collection("connections")
      .doc(email_guard)
      .update({
        email_guard,
        nome,
        status_connection , // 0 pendente - 1-> Ok 2-> terminado 
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
      
  }

  const setConnections = async ( email_guard, email_shopman, nome, status_connection =0  ) => {
    console.log('to aqui em set')
    await db.collection("user")
      .doc(email_guard)
      .collection("connections")
      .doc(email_shopman)
      .set({
        email_shopman,
        nome,
        status_connection  , // 0 pendente - 1-> Ok 2-> terminado 
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

      await db.collection("user")
      .doc(email_shopman)
      .collection("connections")
      .doc(email_guard)
      .set({
        email_guard,
        nome,
        status_connection  , // 0 pendente - 1-> Ok 2-> terminado 
      })
      .then((docRef) => {
        console.log('entrei no then')
        console.log("Doc written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    }

  const getConnections = async (current_email_login,search_user ) => {
    return db.collection("user").doc(current_email_login).collection("connections").doc(search_user);

  }

  return {
    updateConnections,
    setConnections,
    getConnections,
    signIn,
    signUp,
    findUser,
    setFeedbacks,
    getUserProfile,
    getUserFeedback,
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
      .collection("user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().verified && doc.data().type === "guard") {
            guardList = [...guardList, doc.data()];
          }
        });
      });
    return guardList;
  };

  return { getGroups, getGuards, getOccurrences };
};

export const useStorage = () => {
  const uploadFile = async ({ files, setImages, name, setIsLoading }) => {
    const storageRef = storage.ref();
    const isCertification = name === "certifications";
    let downloadURL = "";

    if (isCertification) {
      files.forEach(async (file, index) => {
        const currentFileRef = storageRef.child(file.name);
        setIsLoading(true);

        downloadURL = await currentFileRef
          .put(file)
          .then((image) => image.ref.getDownloadURL().then((url) => url))
          .catch((err) => console.log({ err }));
        console.log({ downloadURL });
        const isLastItem = index === files.length - 1;
        console.log(isLastItem, index);
        if (index === files.length - 1) {
          setIsLoading(false);
        }
        setImages((prev) => ({
          ...prev,

          certifications: [...prev.certifications, downloadURL],
        }));
      });
      return;
    }

    const fileRef = storageRef.child(files.name);
    setIsLoading(true);
    downloadURL = await fileRef.put(files).then((image) =>
      image.ref.getDownloadURL().then((url) => {
        setIsLoading(false);
        return url;
      })
    );

    setImages((prev) => ({ ...prev, [name]: downloadURL }));
  };

  return { uploadFile };
};
