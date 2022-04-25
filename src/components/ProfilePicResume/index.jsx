import {
  PicWrapper,
  ProfileName,
  ProfilePic,
  ProfilelStars,
  Wrapper,
} from "./styles";

import React from "react";

export default function ProfilePicResume({ user = {}, showStars = true }) {
  localStorage.setItem('urlAvaliado',user.imgSrc)

  return (
    <Wrapper>
      <PicWrapper>
        <ProfilePic src={user.imgSrc} alt={`${user.name} profile pic`} />
      </PicWrapper>
      <ProfileName>{user.name}</ProfileName>
      <ProfilelStars>{showStars && user.starsCount} &#9734;</ProfilelStars>
    </Wrapper>
  );
}
