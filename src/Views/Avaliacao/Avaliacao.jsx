import React from 'react';
import 'antd/dist/antd.css';
import { Rate } from 'antd';
import "./starRating.css"

const Avaliacao=()=>{
    return(
        
        <div className='divPai'>
            <h2 className='feedback'>Feedback</h2>
            <textarea placeholder='Escreva o seu feedback' type="text" className='inputFeedback'/>
            <Rate className='starRating' onChange={(numero)=> console.log(numero)}/>
            <h1 className='notaFinal'>Nota Final</h1>
            <button type='submit' className='avaliar'>Avaliar</button>
        </div>
        
    )
}
export default Avaliacao;