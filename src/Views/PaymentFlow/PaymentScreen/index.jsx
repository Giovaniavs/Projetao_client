import { useEffect, useState } from "react"
import axios from 'axios'
import userQueryParams from "./userQueryParams";
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';
import ReactLoading from "react-loading";

import './style.css'

export const PaymentScreen = () => {
    let query = userQueryParams();
    const sltdplan = query.get("selectedPlan") || 'bronzePlan';
    const [payment, setPayment] = useState(undefined)

    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const plan = () => {
        switch (sltdplan) {
            case 'goldPlan':
                return 25
            case 'silverPlan':
                return 15
            case 'bronzePlan':
                return 5
            case 'shopkeeper':
                return 15
            default:
                return 5
        }
    }

    const planStr = () => {
        switch (sltdplan) {
            case 'goldPlan':
                return 'gold'
            case 'silverPlan':
                return 'silver'
            case 'bronzePlan':
                return 'bronze'
            case 'shopkeeper':
                return 'shopkeeper'
            default:
                return 'bronze'
        }
    }
    const payload = {
        "profile_boost_plan": sltdplan,
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
            setPayment(res.data)
        })
    }

    async function copiarQR() {
        const qrdata = payment.body.point_of_interaction.transaction_data.qr_code
        await Clipboard.write({
            string: qrdata
        });
        await Toast.show({
            text: 'Copiado para a área de transferência...',
          });
    }

    useEffect(() => {
        createPayment()
    }, [])


    return (
        <div className="paymentScreen">
            {/* <p>{JSON.stringify(userData)}</p> */}
            {/* <p>{JSON.stringify(payload)}</p> */}
            {/* <p>{JSON.stringify(payment)}</p> */}
            {/* <p>{JSON.stringify(payment.body.point_of_interaction.transaction_data.qr_code_base64)}</p> */}

            {
                payment ?
                    <div className="paymentBody">
                        <h2>R${plan()},00</h2>
                        <h3 style={{textAlign: 'center'}}>Escaneie o QR code abaixo, ou copie o código para efetuar o pagamento.</h3>
                        <img style={{ maxWidth: 200, maxHeight: 200 }} src={`data:image/jpeg;base64,${payment.body.point_of_interaction.transaction_data.qr_code_base64}`} />
                        <button className="button" onClick={copiarQR}>Copiar Código</button>
                    </div> : <ReactLoading
                        className="loading-login-screen-style"
                        type="bars"
                        color="#09629E"
                        height={"20%"}
                        width={"20%"}
                    />
            }
        </div>
    )
}