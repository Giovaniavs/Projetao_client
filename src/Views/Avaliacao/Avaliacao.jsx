import 'antd/dist/antd.css';
import "./starRating.css"

import { BtnAvaliation, ProfilePic, Wrapper } from './styles';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { Rate } from 'antd';
import ReactLoading from "react-loading";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import seguranca from "./img/seguranca.png"
import { useAuth } from '../../firebase';
import { useHistory } from "react-router-dom";

const Avaliacao=()=>{
  const {setFeedbacks} = useAuth();
    const email = localStorage.getItem("emailAvaliado")
    const strObj = JSON.parse(localStorage.getItem("userInfo"))
    const imgAvalido = localStorage.getItem("urlAvaliado")
   const [feedback,setFeedback] = useState('');
   const [points,setPoints] = useState('')
   const [isLoading,setIsLoading] = useState(false)
   const author = strObj.name   
   let history = useHistory();


    return(
        
        <Wrapper>
            {imgAvalido?(<>
                <ProfilePic src={imgAvalido}/> 
                </>):(
                <>
                  <ProfilePic src={seguranca}/>
                </>)
            }
            <Typography sx={{fontWeight: 'bold', fontSize: 25 }} >Feedback</Typography>
            <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="feedback" id="feedback" onChange={(event)=>{
        setFeedback(event.target.value)
        }}/>
    </Box>
            <Rate className='starRating' onChange={(numero)=> setPoints(numero)}/>
            <Typography sx={{fontWeight: 'bold', fontSize: 25 }} >Nota Final</Typography>
            
            {isLoading ? (
              <ReactLoading
              className="loading-login-screen-style"
              type="bars"
              color="#09629E"
              height={"20%"}
              width={"20%"}
            />
            ) : (
            <BtnAvaliation type='submit' onClick={async ()=>{
              if(email != ''){
                setIsLoading(true);
                await setFeedbacks(author,feedback,points, email)
                window.location.replace("/home")

              }
            }}   >Avaliar</BtnAvaliation>
            )

            }
            
            
        </Wrapper>
        
    )
}
export default Avaliacao;