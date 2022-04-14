import ListSecurity from "../../components/ListSecurity/ListSecurity"
import ListSecurityFree from "../../components/ListSecurityFree/ListSecurityFree"
import { PerfilSecContainer } from "./PerfilSec.style"



export default function PerfilSec () {
  return (
    <PerfilSecContainer>
      <ListSecurityFree/>
      <ListSecurity/>
    </PerfilSecContainer>

  )
}