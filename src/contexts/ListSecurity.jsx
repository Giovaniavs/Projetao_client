import { createContext, useState } from "react";

import perfil from '../assets/images/SecPerfil.png'


export const ListSecurtyContext = createContext()

export const ListSecurtyContextProvider = ({children}) => {

  const [listSec, setListSec] = useState([
    ['Maria Fernanda', 4.8, perfil], 
    ['Julião', 4.8, perfil], 
    ['Sidney', 4.8, perfil], 
    ['Marcson', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil], 

  ]);

  return (
    <ListSecurtyContext.Provider value={{listSec, setListSec}}>
      {children}
    </ListSecurtyContext.Provider>
  )
}