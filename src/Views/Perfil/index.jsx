import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import ProfilePicResume from "../../components/ProfilePicResume";
import { useAuth } from "../../firebase";
import { Description, DocImg, DocLink, Docs, Wrapper } from "./styles";
import userQueryParams from "./userQueryParams";
import ReactLoading from "react-loading";
import Topic from "../../components/Topic";
import PrimaryButton from "../../components/PrimaryButton";

export default function Perfil() {
  let query = userQueryParams();
  const email = query.get("email");
  const { getUserProfile } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    getUserProfile(email)
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          setCurrentUser(doc.data());
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setLoading(false);
      });
  }, [query]);

  if (shouldRedirect) {
    return (
      <Redirect push to="/avaliacao" />
    );
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

      <Topic name="Documentos e certificações">
        <Docs>
          {currentUser.docs &&
            currentUser.docs.map(({ url, name }, index) => {
              console.log({ url, name });
              return (
                <DocLink href={url} target="_blank" key={index} title={name}>
                  <DocImg src={url} alt={name} />
                </DocLink>
              );
            })}
        </Docs>
      </Topic>

      <div onClick={() => setShouldRedirect(true)}>
        <PrimaryButton>ESCREVA UM FEEDBACK</PrimaryButton>
      </div>
    </Wrapper>
  );
}
