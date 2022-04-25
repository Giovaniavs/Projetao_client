import 'antd/dist/antd.css';
import "./starRating.css"

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { ProfilePic } from '../../components/ProfilePicResume/styles';
import { Rate } from 'antd';
import TextField from '@mui/material/TextField';
import seguranca from "./img/seguranca.png"

const Avaliacao=()=>{
    const email_avaliado = localStorage.getItem("email_avaliado")
    const strObj = JSON.parse(localStorage.getItem("userInfo"))
    const imgAvalido = localStorage.getItem("urlAvaliado")
      

    console.log(email_avaliado, strObj.name, imgAvalido)
    // [avaliar,setAvaliar] = useState({
    //     points,
    //     feedback,
    //     author
    // })
    // console.log(avaliar)
    return(
        
        <div className='divPai'>
            
            {/* a imagem do seurança tem que ser puxadado back 
            tanto para o feedback como para avaliação e contratação do segurança 
            a imagem que está agora é só para ilustrar*/}
            {
                imgAvalido?(<>
                            <ProfilePic src={imgAvalido}/> 

                </>):(<>
                <img src={seguranca}/>
                </>)
            }
            <h2 className='feedback'>Feedback</h2>

            <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="feedback" id="feedback" />
    </Box>
            <Rate className='starRating' onChange={(numero)=> console.log(numero)}/>
            <h1 className='notaFinal'>Nota Final</h1>
            <button type='submit' className='avaliar'>Avaliar</button>
        </div>
        
    )
}
export default Avaliacao;