import React from "react";
import { Wrapper, GroupList, GroupCarouselTitle } from "./styles";

export default function GroupCarousel({ children }) {
  return (
    <Wrapper>
      <GroupCarouselTitle>Seus grupos</GroupCarouselTitle>
      <GroupList>{children}</GroupList>
    </Wrapper>
  );
}
