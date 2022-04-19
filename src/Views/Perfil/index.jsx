import React, { useEffect, useState } from "react";
import ProfilePicResume from "../../components/ProfilePicResume";
import { useAuth, useQuery } from "../../firebase";
import { Wrapper } from "./styles";
import userQueryParams from "./userQueryParams";
import ReactLoading from "react-loading";

export default function Perfil() {
  let query = userQueryParams();
  const email = query.get("email");
  const { getUserProfile } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

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
    </Wrapper>
  );
}
