import React from "react";
import { Wrapper, TopicContent, TopicTitle } from "./styles";

export default function Topic({ name, children }) {
  return (
    <Wrapper>
      <TopicTitle>{name}</TopicTitle>
      <TopicContent>{children}</TopicContent>
    </Wrapper>
  );
}
