import { createContext, useState } from "react";

import perfil from '../assets/images/SecPerfil.png'
import perfil2 from '../assets/images/Rectangle 25.png'
import perfil3 from '../assets/images/Rectangle 25-1.png'


export const ListSecurtyContext = createContext()

export const ListSecurtyContextProvider = ({children}) => { 

  const [listSec, setListSec] = useState([
    ['Maria Fernanda', 4.8, perfil2], 
    ['Julião', 4.8, perfil], 
    ['Sidney', 4.8, perfil3], 
    ['Marcson', 4.8, perfil2], 
    ['Maria Fernanda', 4.8, perfil3], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil2], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil2], 
    ['Maria Fernanda', 4.8, perfil3], 
    ['Maria Fernanda', 4.8, perfil2], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil2], 
    ['Maria Fernanda', 4.8, perfil], 
    ['Maria Fernanda', 4.8, perfil3], 
    ['Maria Fernanda', 4.8, perfil], 

  ]);

  const [listSecFree, setListSecFree] = useState([
    ['Fábio Murilo', 4.8, perfil3], 
    ['Julião Cesar', 4.8, perfil2], 
    ['Sidney Doido', 4.8, perfil], 
    ['Marcson Silva', 4.8, perfil3], 
    ['Fábio Murilo', 4.8, perfil3], 
    ['Julião Cesar', 4.8, perfil2], 
    ['Sidney Doido', 4.8, perfil], 
    ['Marcson Silva', 4.8, perfil3], 
    ['Fábio Murilo', 4.8, perfil3], 
    ['Julião Cesar', 4.8, perfil2], 
    ['Sidney Doido', 4.8, perfil], 
    ['Marcson Silva', 4.8, perfil3], 
    ['Fábio Murilo', 4.8, perfil3], 
    ['Julião Cesar', 4.8, perfil2], 
    ['Sidney Doido', 4.8, perfil], 
    ['Marcson Silva', 4.8, perfil3], 
  ]);

  return (
    <ListSecurtyContext.Provider value={{listSec, setListSec, listSecFree, setListSecFree}}>
      {children}
    </ListSecurtyContext.Provider>
  )
}