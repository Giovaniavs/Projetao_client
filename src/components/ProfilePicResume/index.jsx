import React from "react";
import {
  PicWrapper,
  ProfilelStars,
  ProfileName,
  ProfilePic,
  Wrapper,
} from "./styles";

export default function ProfilePicResume({ user = {}, showStars = true }) {
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
