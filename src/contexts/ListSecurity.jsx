import { createContext, useState, useEffect, useContext } from "react";

import { useQuery } from "../firebase";

const ListSecurityContext = createContext()

export const ListSecurityContextProvider = ({ children }) => {
  const { getGuards } = useQuery();
  const [listSec, setListSec] = useState(undefined);

  useEffect(() => {
    const newGuards = getGuards()
    setListSec(newGuards);
  }, []);

  return (
    <ListSecurityContext.Provider value={{ listSec, setListSec }}>
      {children}
    </ListSecurityContext.Provider>
  )
}

export const useListSecurity = () => useContext(ListSecurityContext)