import React from "react";
import GroupCard from "../GroupCard";
import { Wrapper, GroupList, GroupCarouselTitle } from "./styles";

export default function GroupCarousel({ groups }) {
  return (
    <Wrapper>
      <GroupCarouselTitle>Seus grupos</GroupCarouselTitle>
      <GroupList>
        {Boolean(groups.length) &&
          groups.map((group) => {
            console.log({ groups });
            return <GroupCard group={group} key={group.id} />;
          })}
      </GroupList>
    </Wrapper>
  );
}
