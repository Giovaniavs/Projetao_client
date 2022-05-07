import { Description, DocImg, DocLink, Docs, Wrapper } from "./styles";
import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { FeedBacks } from "../../components/Feedbacks";
import PrimaryButton from "../../components/PrimaryButton";
import ProfilePicResume from "../../components/ProfilePicResume";
import ReactLoading from "react-loading";
import Topic from "../../components/Topic";
import { useAuth, useQuery } from "../../firebase";
import { useHistory } from "react-router-dom";
import userQueryParams from "./userQueryParams";

export default function Perfil() {
  let query = userQueryParams();
  const email = query.get("email");
  const { getUserProfile, getUserDocs, getUserEvaluations } = useAuth();
  const { setVerification, banAccount } = useQuery();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentUserLogged, setCurrentUserLogged] = useState({});
  const [hasNoLoggedUser, setHasNoLoggedUser] = useState(true);
  const [loadingActivation, setLoadingActivation] = useState(false);

  const linkStyle = {
    textDecoration: "underline",
    color: "blue",
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
        const savedUserInfo = localStorage.getItem("userInfo");
        const hasNoUserSession =
          savedUserInfo === "undefined" || savedUserInfo === null;
        if (hasNoUserSession) {
          setHasNoLoggedUser(true);
        } else {
          setCurrentUserLogged(JSON.parse(savedUserInfo));
          setHasNoLoggedUser(false);
        }
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

        console.log({ docsimage: docs[0].images });
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
            currentUser.docs.map((image, index) => {
              console.log(image);
              return (
                <DocLink
                  href={image.url}
                  target="_blank"
                  key={index}
                  title={image.name}
                >
                  <DocImg src={image.url} alt={image.name} />
                </DocLink>
              );
            })}
        </Docs>
      </Topic>

      <Topic name="Contato">
        <Description>Entre em contato via whatsapp:</Description>
        <a
          style={linkStyle}
          href={`https://wa.me/+55${currentUser.contact}?text=Olá ${currentUser.name}, gostaria de entrar em contato para contratação de seu serviço como segurança! Ví o seu perfil através do App MeSafe e tenho interesse em seu perfil!`}
        >
          {currentUser.contact}
        </a>
      </Topic>
      <Topic name="Feedbacks">
        <FeedBacks></FeedBacks>
      </Topic>

      {currentUserLogged && currentUserLogged.type === "guard" ? (
        <div>
          <PrimaryButton>Apenas lojistas podem dar feedback</PrimaryButton>
        </div>
      ) : (
        !hasNoLoggedUser && currentUserLogged.type !== "admin" && (
          <div onClick={() => setShouldRedirect(true)}>
            <PrimaryButton
              onClick={() => {
                history.push("/avaliacao");
                localStorage.setItem("emailAvaliado", email);
              }}
            >
              ESCREVA UM FEEDBACK
            </PrimaryButton>
          </div>
        )
      )}

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
            <div>
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
