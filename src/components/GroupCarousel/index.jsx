import React from "react";
import GroupCard from "../GroupCard";
import { Wrapper, GroupList, GroupCarouselTitle } from "./styles";

export default function GroupCarousel({ groups }) {
  return (
    <Wrapper>
      <GroupCarouselTitle>Seus grupos</GroupCarouselTitle>
      <GroupList>
        {groups.map((group) => (
          <GroupCard group={group} />
        ))}
      </GroupList>
    </Wrapper>
  );
}
