import { MdLocationOn } from "react-icons/md";
import { useEffect, useState } from 'react';
const Ocurrence = ({ alert, time, distance }) => {
    return (
        <div style={{ width: '100%', marginBottom: 15, border: '1px solid #DDDDDD', borderRadius: 8 }}>
            <p style={{ padding: 17, fontSize: 18, fontWeight: 400 }}>
                {alert}
            </p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 17, paddingRight: 17, paddingBottom: 10 }}>
                <p style={{ color: "#808080", fontWeight: 600, fontSize: 14 }}>
                    <MdLocationOn />à {distance} de você
                </p>
                <p style={{ color: "#000000", fontWeight: 400, fontSize: 16 }}>
                    {time}
                </p>
            </div>
        </div>
    )
}


export const LastOcurrences = () => {
    const [ocurrences, setOcurrences] = useState([])


    useEffect(async () => {
        const options = await [
            {alert: "Suspeito encontrado na rua da moeda", time: "19:57", distance: "50 metros"},
            {alert: "Roubo na loja melhor presente para você", time: "23:13", distance: "50 metros"},
            {alert: "Suspeito encontrado na rua da moeda", time: "19:57", distance: "50 metros"},
            {alert: "Roubo na loja melhor presente para você", time: "23:13", distance: "50 metros"},
        ]

        setOcurrences(options)
    })
    return (
        <div style={{ width: '100%', border: '1px solid red' }} >
            <div style={{ paddingLeft: 18, paddingBottom: 15, paddingTop: 18 }} >
                <h2>Últimas ocorrências</h2>
            </div>
            <div style={{ paddingLeft: 19, paddingRight: 19, paddingBottom: 19 }} >
                {ocurrences.map((ocurrence,index) => {
                    return <Ocurrence key={index} alert={ocurrence.alert} time={ocurrence.time} distance={ocurrence.distance} />
                })}
            </div>
        </div>
    )
}