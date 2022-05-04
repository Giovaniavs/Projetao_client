import { Routes, Route } from "react-router-dom"
import LoginScreen from "../Views/LoginScreen/LoginScreen"
import RegisterScreen from "../Views/RegisterScreen/RegisterScreen"


export const WithoutLogin = () => {
    return (
        <Routes>
            <Route element={<LoginScreen />} path="*" />
            <Route element={<LoginScreen />} path="/" />
            <Route element={<RegisterScreen />} path="/register" />
        </Routes>
    )
}