import { Routes, Route } from "react-router-dom"
import { ListSecurity } from "../components/ListSecurity/ListSecurity"
import NavBar from "../components/NavBar"
import ListRequestRegisterSecurity from "../Views/Admin/Admin"
import Avaliacao from "../Views/Avaliacao/Avaliacao"
import { PaymentScreen } from "../Views/PaymentFlow/PaymentScreen"
import { PlanSelector } from "../Views/PaymentFlow/PlanSelector"
import Perfil from "../Views/Perfil"
import PerfilRequestRegister from "../Views/PerfilRequestRegister/PerfilRequestRegister"
import RefuseRequest from "../Views/RefuseRequest/RefuseRequest"


export const WithLogin = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route element={<ListSecurity />} path="*" />
                <Route element={<ListSecurity />} path="/" />
                <Route element={<ListSecurity />} path="/home" />
                <Route element={<ListRequestRegisterSecurity />} path="/admin" />
                <Route element={<Perfil />} path="/perfil" />
                <Route element={<Avaliacao />} path="/avaliacao" />
                <Route element={<PerfilRequestRegister />} path="/perfilVerificacao" />
                <Route element={<RefuseRequest />} path="/recusar" />
                <Route element={<PlanSelector />} path="/planSelector" />
                <Route element={<PaymentScreen />} path="/paymentScreen" />
            </Routes>
        </>
    )
}