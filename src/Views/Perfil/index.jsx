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
  const { getUserProfile, getUserDocs, getUserEvaluations, setConnections } = useAuth();
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
        listCurrentConections.map((element) => {
          if (element.email === currentUser.email) {
            isCurrent = true
          }
        })
      }

      {
        listPendingConections.map((element) => {
          if (element.email === currentUser.email) {
            isPending = true   
          }
        })
      }

      {
        (!isCurrent && isPending) ?   
        <Button variant="contained" disabled onClick={() => {
          // console.log(currentUserLogged)
        }}>solicitação enviada</Button>
        :
        <Button 
        variant="contained" 
        onClick={() => {
          setConnections( currentUser.email, currentUserLogged.email, '0')
          console.log(currentUserLogged.pendingConections)
          // console.log(currentUser)
        }}>conectar-se</Button>

      } 

      {
        (!isCurrent && isPending) ? 
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
        <>
        <Topic name="Feedbacks">
          <FeedBacks />
        </Topic>
        </>
      }


      {currentUserLogged.type === 'guard' ? (
      <div>
        <PrimaryButton>
          Apenas lojistas podem dar feedback
        </PrimaryButton>
      </div>
      ) : <></>
      }


      {
        listFinishedConections.map((element) => {
          if (element.email === currentUser.email) {            
            isFeedback = true   
          }
        })
      }

      {
        isFeedback ? 
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


