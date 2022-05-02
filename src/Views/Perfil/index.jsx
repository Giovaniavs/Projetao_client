import { Description, DocImg, DocLink, Docs, Wrapper } from "./styles";
import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import { FeedBacks } from "../../components/Feedbacks";
import PrimaryButton from "../../components/PrimaryButton";
import ProfilePicResume from "../../components/ProfilePicResume";
import ReactLoading from "react-loading";
import Topic from "../../components/Topic";
import { useAuth } from "../../firebase";
import { useHistory } from "react-router-dom";
import userQueryParams from "./userQueryParams";

export default function Perfil() {
  let query = userQueryParams();
  const email = query.get("email");
  const { getUserProfile, getUserDocs, getUserEvaluations, setConnections,updateConnections, getConnections} = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentUserLogged, setCurrentUserLogged] = useState({});
  const [statusConnectionsState, setStatusConnectionsState] = useState(0);

  let listCurrentConections = currentUserLogged.currentConections
  let listPendingConections = currentUserLogged.pendingConections
  let listFinishedConections = currentUserLogged.finishedConections
  // tu pode criar um ' atual estado '(q pode ser uma string), se no get retornar um erro -> ele ainda n tem conexao 
  // se o get retornar 0 -> ele tem uma pendente, e assim sucessivamente

  let isCurrent = false
  let isFeedback = false
  let isPending = false

  // let aux = 0
  
  const getStatus = () => {
    let aux = 0
    getConnections(currentUser.email, currentUserLogged.email).then(res => {
      res.get().then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data(), 'documentooo AQUIII');
          console.log(getStatus() === 1);

          // console.log(parseInt(doc.data().status_connection));
          aux = parseInt(doc.data().status_connection)
          // return doc.data().status_connection
          // AQUI SETARIA O NOVO VALOR PARA O TIPO DE STATUS
      } else {
        // AQUI MOSTRARIA O BTN CONNECTAR
          // doc.data() will be undefined in this case
          console.log("No such document!");
          // return 0
      }
      })
    })

    return aux
  }





  
  // console.log('auxaux',aux);

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

  if (shouldRedirect) {
    return <Redirect push to="/avaliacao" />;
  }

  if (loading)
    return (
      <Wrapper>
        <ReactLoading
          className="loading-login-screen-style"
          type="bars"
          color="#09629E"
          height={"20%"}
          width={"20%"}
        />
      </Wrapper>
    );




  console.log('user atual')
  console.log(currentUserLogged)
  console.log('perfil clicado');
  console.log(currentUser);
  // console.log('getStatus => ', getStatus())



  // console.log('getstatus');
  // console.log(getStatus() === 1);
  // console.log(getStatus());

  const aux = getStatus()

  return (
    <Wrapper>
      <ProfilePicResume user={currentUser} />
      <Topic name="Descrição">
        <Description>{currentUser.description}</Description>
      </Topic>

      <Topic name="Certificações">
        <Docs>
          {currentUser.docs &&
            currentUser.docs.map(({ url, name }, index) => {
              return (
                <DocLink href={url} target="_blank" key={index} title={name}>
                  <DocImg src={url} alt={name} />
                </DocLink>
              );
            })}
        </Docs>
      </Topic>

      {
        aux === 0 ? 
        <Button 
          variant="contained" 
          onClick={() => {
            console.log('TO NO BTN CONNECTION')
            setConnections( currentUser.email, currentUserLogged.email, currentUserLogged.name , '1')
            setStatusConnectionsState(1)
            // console.log(currentUser)
          }}>conectar-se
        </Button>
        :
        <></>
      
      } 
      {
        aux === 1 ? 
        // ver se já existe conneccao e qual o status dela 
        <Button 
          variant="contained" 
          disabled 
          onClick={() => {
            // console.log(currentUserLogged)
          }}>solicitação enviada
        </Button>
        :
        <></>
      
      } 
      {
        aux === 2 ? 
        // já existe conneccao e qual o status dela 
        <>
        <Topic name="Contato">
        <Description>Entre em contato via whatsapp:</Description>
          <a style={linkStyle} href={`https://wa.me/+55${currentUser.contact}?text=Olá ${currentUser.name}, gostaria de entrar em contato para contratação de seu serviço como segurança! Ví o seu perfil através do App MeSafe e tenho interesse em seu perfil!`}>{currentUser.contact}</a>
        </Topic>
        <Topic name="Feedbacks">
          <FeedBacks />
        </Topic>
        </>
        :
        <></>
      
      } 

      <>
        <Topic name="Feedbacks">
          <FeedBacks />
        </Topic>
      </>

      {currentUserLogged.type === 'guard' ? (
      <div>
        <PrimaryButton>
          Apenas lojistas podem dar feedback
        </PrimaryButton>
      </div>
      ) : <></>
      }

      {
       aux === 3 ? 
        (
            <div onClick={() => setShouldRedirect(true)}>
              <PrimaryButton onClick={()=>{
                    history.push("/avaliacao");
                    localStorage.setItem("emailAvaliado",email)
              }}>ESCREVA UM FEEDBACK</PrimaryButton>
            </div>
          ) 
        : <></>
      }
    </Wrapper>
  );
}


