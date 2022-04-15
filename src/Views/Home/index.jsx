import React, { useEffect, useState } from "react";
import GroupCarousel from "../../components/GroupCarousel";
import { getGroups } from "../../services/groups";
import { Wrapper } from "./styles";

export default function Home() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups().then((groups) => setGroups(groups));
  }, []);

  return (
    <Wrapper>
      <GroupCarousel groups={groups} />
    </Wrapper>
  );
}
