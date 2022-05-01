import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../firebase";
import userQueryParams from "../Perfil/userQueryParams";
import { ConectionsContainer, RequestPending } from "./Conections.style";

function ConectionsPending () {
  let query = userQueryParams();
  const email = query.get("email");
  const { getUserProfile, getUserDocs, getUserEvaluations } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentUserLogged, setCurrentUserLogged] = useState({});

  let listCurrentConections = currentUserLogged.currentConections
  let listPendingConections = currentUserLogged.pendingConections
  let listFinishedConections = currentUserLogged.finishedConections

  let isCurrent = false
  let isFeedback = false
  let isPending = false

  const linkStyle = {
    textDecoration: "underline",
    color: 'blue'
  };
  let history = useHistory();

  useEffect(() => {
    getUserInfo();
    getDocs();
    getEvaluations();
  }, [query]);

  const getUserInfo = () => {
    getUserProfile(email)
      .then((user) => {
        setLoading(true);
        setCurrentUser(user.data());
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setLoading(false);
      });

      setCurrentUserLogged(JSON.parse(localStorage.getItem("userInfo")));
  };

  const getDocs = () => {
    getUserDocs(email).then((response) => {
      setLoading(true);
      response.get().then((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs = [...docs, { id: doc.id, ...doc.data() }];
        });

        console.log(docs);
        setCurrentUser((prev) => ({ ...prev, docs }));
        setLoading(false);
      });
    });
  };

  const getEvaluations = () => {
    getUserEvaluations(email).then((response) => {
      setLoading(true);
      response.get().then((querySnapshot) => {
        let evaluations = [];
        querySnapshot.forEach((doc) => {
          evaluations = [...evaluations, { id: doc.id, ...doc.data() }];
        });

        setCurrentUser((prev) => ({ ...prev, evaluations }));
        setLoading(false);
      });
    });
  };
  return (
    
    <ConectionsContainer>
      {
        currentUserLogged.pendingConections > 0 ?
        (
          currentUserLogged.pendingConections.map((element) => {

          <RequestPending>
            {element.name}
            <div>
              <Button variant="contained" color="success">Aceitar</Button>
              <Button variant="contained" color="error">Cancelar</Button>
            </div>
          </RequestPending>
          })
        ) : (
          
          <h1>Não há conexões pendentes</h1>
        )
      }
    </ConectionsContainer>

    
  ) 
}

export default ConectionsPending;