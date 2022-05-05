import { createContext, useState, useEffect } from "react";

import { useQuery } from "../firebase";


export const ListRequestRegisterSecurtyContext = createContext()

export const ListRequestRegisterSecurtyContextProvider = ({children}) => {
  const { getRequestRegisterGuards } = useQuery();
  const [listSecRequestRegister, setListSecRequestRegister] = useState([]);
  
  useEffect(() => {
    setListSecRequestRegister(getRequestRegisterGuards);
  }, []);

  return (
    <ListRequestRegisterSecurtyContext.Provider value={{listSecRequestRegister, setListSecRequestRegister}}>
      {children}
    </ListRequestRegisterSecurtyContext.Provider>
  )
}