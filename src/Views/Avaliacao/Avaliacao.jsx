import 'antd/dist/antd.css';
import "./starRating.css"

import { BtnAvaliation, ProfilePic, Wrapper } from './styles';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { Rate } from 'antd';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import seguranca from "./img/seguranca.png"
import { useAuth } from '../../firebase';
import { useHistory } from "react-router-dom";

const Avaliacao = () => {
  const { setFeedbacks } = useAuth();
  const email = localStorage.getItem("emailAvaliado")
  const strObj = JSON.parse(localStorage.getItem("userInfo"))
  const imgAvalido = localStorage.getItem("urlAvaliado")
  const [feedback, setFeedback] = useState('');
  const [points, setPoints] = useState('')
  const author = strObj.name
  let history = useHistory();


  return (

    <Wrapper>
      {imgAvalido ? (<>
        <ProfilePic src={imgAvalido} />
      </>) : (
        <>
          <ProfilePic src={seguranca} />
        </>)
      }
      <Typography sx={{ fontWeight: 'bold', fontSize: 25 }} >Feedback</Typography>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField fullWidth label="feedback" id="feedback" onChange={(event) => {
          setFeedback(event.target.value)
        }} />
      </Box>
      <Rate className='starRating' onChange={(numero) => setPoints(numero)} />
      <Typography sx={{ fontWeight: 'bold', fontSize: 25 }} >Nota Final</Typography>
      <BtnAvaliation type='submit' onClick={() => {
        if (email != '') {
          setFeedbacks(author, feedback, points, email)
          history.push(`/perfil?email=${email}`)

        }
      }}   >Avaliar</BtnAvaliation>
    </Wrapper>

  )
}
export default Avaliacao;