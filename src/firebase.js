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
  const createUser = async ({ user, images }, callback) => {
    const { name, email, contact, type, description } = user;
    await Promise.all([
      // create user collection
      fire
        .firestore()
        .collection("user")
        .doc(email)
        .set({
          name,
          email,
          contact,
          type,
          starsCount: 0,
          imgSrc: (images.perfilPic[0] && images.perfilPic[0].url) || "",
          description,
          profileBoostPlan: "none",
          verified: false,
        }),

      // set user certifications
      fire
        .firestore()
        .collection("user")
        .doc(email)
        .collection("certifications")
        .doc()
        .set({ images: images.certifications }),

      // set user CNV
      fire
        .firestore()
        .collection("user")
        .doc(email)
        .collection("cnv")
        .doc()
        .set({ images: images.cnv }),

      // set user documents
      fire
        .firestore()
        .collection("user")
        .doc(email)
        .collection("docs")
        .doc()
        .set({
          images: [
            ...images.carteiradeIdentidade,
            ...images.comprovanteResidencia,
            ...images.cnv,
          ],
        }),
      fire.firestore().collection("user").doc(email).collection("feedbacks"),
    ]).then((response) => callback(response));
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

  const signUp = (
    { user, images, setIsLoading, setShouldRedirectToLogin },
    callback
  ) => {
    const { email, password } = user;
    setIsLoading(true);
    return fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        callback(user);

        setIsLoading(false);
        // }
      });
  };
  const setFeedbacks = async (author, feedback, points, email) => {
    let starsList = [];
    let sumStars = 0;

    await db
      .collection("user")
      .doc(email)
      .collection("feedbacks")
      .add({
        author,
        feedback,
        points,
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    await db
      .collection("user")
      .doc(email)
      .collection("feedbacks")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          sumStars = sumStars + doc.data().points;
          starsList.push(doc.data().points);
        });
      });

    await db
      .collection("user")
      .doc(email)
      .update({
        starsCount: Math.floor(sumStars / starsList.length),
      });
  };

  const findUser = async (email) => {
    return await fire
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
        const userType = userFetched.type;
        if (userType === "admin") {
          window.location.replace("/admin");
        } else {
          window.location.replace("/home");
        }
        localStorage.setItem("userInfo", JSON.stringify(userFetched));
        localStorage.setItem("uid", email);
      });
  };

  const setUser = async (email) => {
    return await fire
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

  const getUserCertifications = async (email) => {
    return db.collection("user").doc(email).collection("certifications");
  };

  const getUserDocs = async (email) => {
    return db.collection("user").doc(email).collection("docs");
  };

  const getUserFeedback = async (email) => {
    return db.collection("user").doc(email).collection("feedbacks");
  };
  const getUserEvaluations = async (email) => {
    return db.collection("user").doc(email).collection("evaluations");
  };

  const updateConnections = async (email_guard, email_shopman,status_connection) => {
    await db.collection("user")
      .doc(email_guard)
      .collection("connections")
      .doc(email_shopman)
      .update({
       
        status_connection , // 0 pendente - 1-> Ok 2-> terminado 
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
      .update({
        
        status_connection , // 0 pendente - 1-> Ok 2-> terminado 
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
      
  }

  const setConnections = async ( email_guard, email_shopman, nome_guard,nome_shopman, status_connection =0  ) => {
    // console.log('to aqui em set')
    await db.collection("user")
      .doc(email_guard)
      .collection("connections")
      .doc(email_shopman)
      .set({
        email_shopman,
        nome_shopman,
        email_guard,
        nome_guard,
        status_connection  , // 0 pendente - 1-> Ok 2-> terminado 
      })
      // .then((docRef) => {
      //   console.log("Doc written with ID: ", docRef);
      // })
      // .catch((error) => {
      //   console.error("Error adding document: ", error);
      // });

      await db.collection("user")
      .doc(email_shopman)
      .collection("connections")
      .doc(email_guard)
      .set({
        email_shopman,
        nome_shopman,
        email_guard,
        nome_guard,
        status_connection  , // 0 pendente - 1-> Ok 2-> terminado 
      })
      // .then((docRef) => {
      //   console.log('entrei no then')
      //   console.log("Doc written with ID: ", docRef);
      // })
      // .catch((error) => {
      //   console.error("Error adding document: ", error);
      // });
    }

  const getConnections = async (current_email_login,search_user ) => {
    return db.collection("user").doc(current_email_login).collection("connections").doc(search_user);

  }

  const getAllConnections = async (current_email_login ) => {
    return db.collection("user").doc(current_email_login).collection("connections");

  }
  
  return {
    updateConnections,
    setConnections,
    getConnections,
    getAllConnections,
    createUser,
    signIn,
    signUp,
    findUser,
    setFeedbacks,
    getUserProfile,
    getUserFeedback,
    getUserDocs,
    getUserCertifications,
    getUserEvaluations,
    setUser,
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
    let listGold = [];
    let listSilver = [];
    let listBronze = [];
    let listNone = [];
    let guardList = [];

    await fire
      .firestore()
      .collection("user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().verified && doc.data().type === "guard") {
            if (doc.data().profileBoostPlan === "silverPlan") {
              listSilver = [...listSilver, doc.data()];
            } else if (doc.data().profileBoostPlan === "goldPlan") {
              listGold = [...listGold, doc.data()];
            } else if (doc.data().profileBoostPlan === "bronzePlan") {
              listBronze = [...listBronze, doc.data()];
            } else if (doc.data().profileBoostPlan === "none") {
              listNone = [...listNone, doc.data()];
            }
          }
        });

        listGold.sort((a, b) => {
          if (a.starsCount < b.starsCount) {
            return 1;
          }
          if (a.starsCount > b.starsCount) {
            return -1;
          } else {
            return 0;
          }
        });

        listSilver.sort((a, b) => {
          if (a.starsCount < b.starsCount) {
            return 1;
          }
          if (a.starsCount > b.starsCount) {
            return -1;
          } else {
            return 0;
          }
        });

        listBronze.sort((a, b) => {
          if (a.starsCount < b.starsCount) {
            return 1;
          }
          if (a.starsCount > b.starsCount) {
            return -1;
          } else {
            return 0;
          }
        });

        listNone.sort((a, b) => {
          if (a.starsCount < b.starsCount) {
            return 1;
          }
          if (a.starsCount > b.starsCount) {
            return -1;
          } else {
            return 0;
          }
        });

        guardList = [...listGold, ...listSilver, ...listBronze, ...listNone];
      });
    return guardList;
  };

  const getRequestRegisterGuards = async () => {
    let getRequestRegisterGuards = [];
    await fire
      .firestore()
      .collection("user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (!doc.data().verified && doc.data().type === "guard") {
            getRequestRegisterGuards = [
              ...getRequestRegisterGuards,
              doc.data(),
            ];
          }
        });
      });
    return getRequestRegisterGuards;
  };

  const setVerification = async (email, isVerified) => {
    return await fire
      .firestore()
      .collection("user")
      .doc(email)
      .update({
        verified: isVerified,
      })
      .then((response) => true);
  };

  const banAccount = async (email, isVerified) => {
    return await fire
      .firestore()
      .collection("user")
      .doc(email)
      .delete()
      .then((response) => true);
  };

  return {
    getGroups,
    getGuards,
    getOccurrences,
    getRequestRegisterGuards,
    setVerification,
    banAccount,
  };
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
