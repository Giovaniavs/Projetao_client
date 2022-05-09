import { Description, DocImg, DocLink, Docs, Wrapper } from "./styles";
import React, { memo, useEffect, useState } from "react";

import Button from '@mui/material/Button';
import { FeedBacks } from "../../components/Feedbacks";
import PrimaryButton from "../../components/PrimaryButton";
import ProfilePicResume from "../../components/ProfilePicResume";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import Topic from "../../components/Topic";
import { useAuth, useQuery } from "../../firebase";
import { useHistory } from "react-router-dom";
import userQueryParams from "./userQueryParams";

function Perfil() {
  let query = userQueryParams();
  const email = query.get("email");
  const { setVerification, banAccount } = useQuery();
  const { getUserProfile, getUserCertifications, getUserEvaluations, setConnections, getConnections} = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentUserLogged, setCurrentUserLogged] = useState({});
  const [isCurrentConnection, setIsCurrentConnection] = useState();
  const [loadingActivation, setLoadingActivation] = useState(false);

  
  const getStatus = () => {
    getConnections( currentUserLogged.email, currentUser.email,).then(res => {
      res.get().then( doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data(), 'documentooo AQUIII');
          
           setIsCurrentConnection(parseInt(doc.data().status_connection))
    
      } else {
  
 
          console.log("test 123");
          setIsCurrentConnection(-1)
      }
      })
    })

  }

  const linkStyle = {
    textDecoration: "underline",
    color: "blue",
  };
  
  let history = useHistory();

  getStatus();
  console.log('renderizou')
  useEffect(() => {
    getUserInfo();
    getCertifications();
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

  const getCertifications = () => {
    getUserCertifications(email).then((response) => {
      setLoading(true);
      response.get().then((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs = [...docs, { id: doc.id, ...doc.data() }];
        });

        if (docs[0].images) {
          setCurrentUser((prev) => ({ ...prev, docs: docs[0].images }));
          return;
        }

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

  const desactivateAccount = async () => {
    setLoadingActivation(true);

    await setVerification(currentUser.email, false);

    window.location.replace("/home");
  };

  const banCurrentAccount = async () => {
    setLoadingActivation(true);

    await banAccount(currentUser.email);

    window.location.replace("/home");
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
        isCurrentConnection === -1  && currentUserLogged.type === "shopman" ? 
        <Button 
          variant="contained" 
          onClick={async () => {
          console.log(currentUser.name, currentUserLogged.name)
          await  setConnections( currentUser.email, currentUserLogged.email,currentUser.name, currentUserLogged.name , '0')
           await setIsCurrentConnection(0)
           history.push("/home")
          }}>conectar-se
        </Button>
        : isCurrentConnection === 0 && currentUserLogged.type === "shopman" ?  <>
        <Button 
          variant="contained" 
          disabled 
          onClick={() => {
            // console.log(currentUserLogged)
          }}>solicitação enviada
        </Button></>  : isCurrentConnection ===1 && currentUserLogged.type === "shopman" ? <>
        <Topic name="Contato">
        <Description>Entre em contato via whatsapp:</Description>
          <a style={linkStyle} href={`https://wa.me/+55${currentUser.contact}?text=Olá ${currentUser.name}, gostaria de entrar em contato para contratação de seu serviço como segurança! Ví o seu perfil através do App MeSafe e tenho interesse em seu perfil!`}>{currentUser.contact}</a>
        </Topic>
        
        <div onClick={() => setShouldRedirect(true)}>
              <PrimaryButton onClick={()=>{
                    history.push("/avaliacao");
                    localStorage.setItem("emailAvaliado",email)
              }}>ESCREVA UM FEEDBACK</PrimaryButton>
            </div>
        

        </> :  isCurrentConnection ===2 && currentUserLogged.type === "shopman"? <> <h1>essa connexao já foi finalizada</h1></>: <></>
      
      } 
     
     
      <>
        <Topic name="Feedbacks">
          <FeedBacks />
        </Topic>
      </>

      {currentUserLogged.type === "admin" && (
        <>
          {loadingActivation ? (
            <ReactLoading
              className="loading-login-screen-style"
              type="bars"
              color="#09629E"
              height={"20%"}
              width={"20%"}
            />
          ) : (
            <div style={{ margin: '30px 0' }}>
              <PrimaryButton
                onClick={desactivateAccount}
                style={{ margin: "0 0 15px 0" }}
              >
                Remover verificação
              </PrimaryButton>
              <PrimaryButton onClick={banCurrentAccount}>
                Banir conta
              </PrimaryButton>
            </div>
          )}
        </>
      )}
     
    </Wrapper>
  );
}


export default memo(Perfil);