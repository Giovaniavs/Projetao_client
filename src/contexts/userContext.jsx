import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const UserContextProvider = ({children}) => {

  const [userInfo, setUserInfo] = useState(undefined);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)