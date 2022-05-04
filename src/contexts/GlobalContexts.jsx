import { ListRequestRegisterSecurityContextProvider } from "./ListRequestRegisterGuards"
import { ListSecurityContextProvider } from "./ListSecurity"
import { UserContextProvider } from "./userContext"


export const GlobalContext = ({ children }) => {
    return (
        <UserContextProvider>
            <ListRequestRegisterSecurityContextProvider>
                <ListSecurityContextProvider>
                    {children}
                </ListSecurityContextProvider>
            </ListRequestRegisterSecurityContextProvider>
        </UserContextProvider>
    )
}