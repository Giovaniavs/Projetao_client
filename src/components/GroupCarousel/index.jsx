import React from "react";
import { Wrapper, GroupList } from "./styles";

export default function GroupCarousel({ children }) {
  return (
    <Wrapper>
      <GroupList>{children}</GroupList>
    </Wrapper>
  );
}
