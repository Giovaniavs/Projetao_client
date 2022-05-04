import { useEffect, useState } from "react"
import axios from 'axios'
import userQueryParams from "./userQueryParams";
export const PaymentScreen = () => {
    let query = userQueryParams();
    const sltdplan = query.get("selectedPlan") || 'bronzePlan';
    const [payment, setPayment] = useState({})

    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const plan = () => {
        switch (sltdplan) {
            case 'goldPlan':
                return 25
            case 'silverPlan':
                return 15
            case 'bronzePlan':
                return 5
            default:
                return 5
        }
    }
    const payload = {
        "firebase_user_id": userData.email,
        "payment_method_id": "pix",
        "transaction_amount": plan(),
        "payer": {
            "email": userData.email,
            "first_name": userData.name,
            "last_name": userData.name,
        }
    }
    function createPayment() {
        axios.post('https://mesafe-payment-service.herokuapp.com/createpayment', payload).then((res) => {
        console.log    
        setPayment(res.data)
        })
    }

    useEffect(() => {
        createPayment()
    }, [])


    return (
        <>
            <p>{JSON.stringify(userData)}</p>
            <p>{JSON.stringify(payload)}</p>
            <p>{JSON.stringify(payment.body.point_of_interaction.transaction_data.qr_code_base64)}</p>
            <img style={{maxWidth:200, maxHeight:200}} src={`data:image/jpeg;base64,${payment.body.point_of_interaction.transaction_data.qr_code_base64}`}/>
            <button>Copiar Código</button>
        </>
    )
}