import React from "react";
import { BoxShadowHelper, GroupImage, Wrapper, GroupTitle } from "./styels";

export default function GroupCard({ group = { title: "Some title" } }) {
  return (
    <Wrapper>
      <GroupImage src="https://source.unsplash.com/random" alt="alt ai" />
      <BoxShadowHelper />
      <GroupTitle>{group.title}</GroupTitle>
    </Wrapper>
  );
}
