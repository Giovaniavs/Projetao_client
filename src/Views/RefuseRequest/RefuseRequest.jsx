import 'antd/dist/antd.css';
import "./starRating.css"

import { BtnAvaliation, ProfilePic, Wrapper } from './styles';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../firebase';
import { useHistory } from "react-router-dom";

const RefuseRequest=()=>{
    const email = localStorage.getItem("emailAvaliado")
    const strObj = JSON.parse(localStorage.getItem("userInfo"))
   const [feedback,setFeedback] = useState('');
   const author = strObj.name   
   let history = useHistory();

  let templateParams = {
    to_name: 'James',
    reply_to: 'gavs2@cin.ufpe.br',
    message: feedback,
  };

   const sendEmail = async () => {
    emailjs.send('service_z54odph', 'template_ns4stuj', templateParams, '4CqV65zx_cKzGrtHB')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
   };


    return(
        <Wrapper>
          <br></br>
            <Typography sx={{fontWeight: 'bold', fontSize: 25 }}>Motivo</Typography>
            <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        multiline
        label="Feedback"
        id="feedback"
        onChange={(event)=>{
          setFeedback(event.target.value)
        }}
        />
    </Box>
            <BtnAvaliation type='submit' onClick={sendEmail}>Enviar</BtnAvaliation>
        </Wrapper>
        
    )
}
export default RefuseRequest;