import { createContext, useState, useEffect, useContext } from "react";

import { useQuery } from "../firebase";


const ListRequestRegisterSecurityContext = createContext()

export const ListRequestRegisterSecurityContextProvider = ({children}) => {
  const { getRequestRegisterGuards } = useQuery();
  const [listSecRequestRegister, setListSecRequestRegister] = useState([]);
  
  useEffect(() => {
    setListSecRequestRegister(getRequestRegisterGuards);
  }, []);

  return (
    <ListRequestRegisterSecurityContext.Provider value={{listSecRequestRegister, setListSecRequestRegister}}>
      {children}
    </ListRequestRegisterSecurityContext.Provider>
  )
}

export const useListRequestRegisterSecurity = () => useContext(ListRequestRegisterSecurityContext)