import { createContext, useState, useEffect } from "react";

import perfil from '../assets/images/SecPerfil.png'

import { useQuery } from "../firebase";


export const ListSecurtyContext = createContext()

export const ListSecurtyContextProvider = ({children}) => {
  const { getGuards } = useQuery();
  const [listSec, setListSec] = useState([]);
  
  useEffect(() => {
    setListSec(getGuards);
  }, []);

  return (
    <ListSecurtyContext.Provider value={{listSec, setListSec}}>
      {children}
    </ListSecurtyContext.Provider>
  )
}