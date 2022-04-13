import React from "react";
import { BoxShadowHelper, GroupImage, Wrapper, GroupTitle } from "./styels";

export default function GroupCard({
  group = {
    name: "Group title",
    id: 1,
    imgSrc: "https://source.unsplash.com/random",
  },
}) {
  const { id, name, imgSrc } = group;

  return (
    <Wrapper to={`/group/${id}`}>
      <GroupImage src={imgSrc} alt={`group title ${name}`} />
      <BoxShadowHelper />
      <GroupTitle>{name}</GroupTitle>
    </Wrapper>
  );
}
