import React, { useEffect, useState } from "react";
import GroupCarousel from "../../components/GroupCarousel";
import LastOccurrences from "../../components/LastOcurrences/LastOcurrences";
import { useQuery } from "../../firebase";
import { Wrapper } from "./styles";

export default function Home() {
  const { getGroups, getOccurrences } = useQuery();

  const [groups, setGroups] = useState([]);
  const [occurrences, setOccurrences] = useState([]);
  useEffect(() => {
    getGroups().then((groups) => setGroups(groups));
    getOccurrences().then((occurrences) => setOccurrences(occurrences));
  }, []);

  return (
    <Wrapper>
      <GroupCarousel groups={groups} />
      <LastOccurrences occurrences={occurrences} />
    </Wrapper>
  );
}
