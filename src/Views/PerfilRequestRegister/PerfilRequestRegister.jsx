import { Description, DocImg, DocLink, Docs, Wrapper } from "./styles";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import emailjs from '@emailjs/browser';
import ProfilePicResume from "../../components/ProfilePicResume";
import ReactLoading from "react-loading";
import Topic from "../../components/Topic";
import { useAuth, useQuery } from "../../firebase";
import { useHistory } from "react-router-dom";
import userQueryParams from "./userQueryParams";

export default function PerfilRequestRegister() {
  let query = userQueryParams();
  const email = query.get("email");
  const { getUserProfile, getUserDocs, getUserEvaluations } = useAuth();
  const { setVerification } = useQuery();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingActivation, setLoadingActivation] = useState(false);

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

  let templateParams = {
    to_name: currentUser.name,
    reply_to: currentUser.email,
  };

  const activateAccount = async () => {
    setLoadingActivation(true);
    
    await emailjs.send('service_z54odph', 'template_e6718ro', templateParams, '4CqV65zx_cKzGrtHB')
    .then(async () => {
      await setVerification(currentUser.email, true);
      window.location.replace("/home")
    }, (error) => {
        console.log(error.text);
    });
  };

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

      <Topic name="Contato">
        <Description>Entre em contato via whatsapp:</Description>
          <a style={linkStyle} href={`https://wa.me/+55${currentUser.contact}?text=Olá ${currentUser.name}, gostaria de entrar em contato para contratação de seu serviço como segurança! Ví o seu perfil através do App MeSafe e tenho interesse em seu perfil!`}>{currentUser.contact}</a>
      </Topic>
      
      {loadingActivation ? (
        <ReactLoading
        className="loading-login-screen-style"
        type="bars"
        color="#09629E"
        height={"20%"}
        width={"20%"}
      />
      ) : (
        <div style={{ margin: '50px 0 0 0' }}>
        <Button variant="contained" style={{ margin: '0 20px 0 0' }} onClick={activateAccount}>Aprovar</Button>
        <Button variant="outlined" onClick={() => history.push(`/recusar?email=${currentUser.email}`)}>Não aprovar</Button>
      </div>
      )}
      
    </Wrapper>
  );
}