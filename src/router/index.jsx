import { Router } from "react-router-dom"
import { useUser } from "../contexts/userContext"
import { WithLogin } from "./WithLogin"
import { WithoutLogin } from "./WithoutLogin"

export const GlobalRouter = () => {
    const { userInfo } = useUser()
    console.log(userInfo)

    return userInfo ? <WithLogin /> : <WithoutLogin />

}