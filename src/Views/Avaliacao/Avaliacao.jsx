import 'antd/dist/antd.css';
import "./starRating.css"

import { Rate } from 'antd';
import React from 'react';
import seguranca from "./img/seguranca.png"

const Avaliacao=()=>{

    
    
    return(
        
        <div className='divPai'>
            
            {/* a imagem do seurança tem que ser puxadado back 
            tanto para o feedback como para avaliação e contratação do segurança 
            a imagem que está agora é só para ilustrar*/}
            <img src={seguranca}/> 
            <h2 className='feedback'>Feedback</h2>
            <textarea placeholder='Escreva o seu feedback' type="text" className='inputFeedback'/>
            <Rate className='starRating' onChange={(numero)=> console.log(numero)}/>
            <h1 className='notaFinal'>Nota Final</h1>
            <button type='submit' className='avaliar'>Avaliar</button>
        </div>
        
    )
}
export default Avaliacao;