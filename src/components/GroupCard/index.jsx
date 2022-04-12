import React from "react";
import { BoxShadowHelper, GroupImage, Wrapper, GroupTitle } from "./styels";

export default function GroupCard({
  group = {
    title: "Group title",
    id: 1,
    imgSrc: "https://source.unsplash.com/random",
  },
}) {
  const { id, title, imgSrc } = group;

  return (
    <Wrapper to={`/group/${id}`}>
      <GroupImage src={imgSrc} alt={`group title ${group.title}`} />
      <BoxShadowHelper />
      <GroupTitle>{title}</GroupTitle>
    </Wrapper>
  );
}
