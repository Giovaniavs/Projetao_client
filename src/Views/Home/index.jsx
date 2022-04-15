import React, { useEffect, useState } from "react";
import GroupCarousel from "../../components/GroupCarousel";
import { Wrapper } from "./styles";
import { useQuery } from '../../firebase'
import { Wrapper } from './styles'

export default function Home() {
  const { getGroups } = useQuery()

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
