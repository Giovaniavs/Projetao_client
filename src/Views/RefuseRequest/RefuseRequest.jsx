import 'antd/dist/antd.css';
import "./starRating.css"

import { BtnAvaliation, ProfilePic, Wrapper } from './styles';
import ReactLoading from "react-loading";
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../firebase';
import { useHistory } from "react-router-dom";
import userQueryParams from "./userQueryParams";

const RefuseRequest=()=>{
  let query = userQueryParams();
  const email = query.get("email");
  const [loading, setLoading] = useState(true);
  const { getUserProfile } = useAuth();
  const strObj = JSON.parse(localStorage.getItem("userInfo"))
  const [feedback,setFeedback] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loadingEmailSending, setLoadingEmailSending] = useState(false);
  const author = strObj.name   
  let history = useHistory();

   useEffect(() => {
    getUserInfo();
  }, [query]);

  const getUserInfo = () => {
    getUserProfile(email)
      .then((user) => {
        setLoading(true);
        setCurrentUser(user.data());
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setLoading(false);
      });
  };

  let templateParams = {
    to_name: currentUser.name,
    reply_to: currentUser.email,
    message: feedback,
  };

   const sendEmail = async () => {
    setLoadingEmailSending(true);

    await emailjs.send('service_z54odph', 'template_ns4stuj', templateParams, '4CqV65zx_cKzGrtHB')
    .then(() => {
      history.push('/admin')
    }, (error) => {
        console.log(error.text);
    });
   };

   if (loading)
    return (
      <Wrapper>
        <ReactLoading
          className="loading-login-screen-style"
          type="bars"
          color="#09629E"
          height={"20%"}
          width={"20%"}
        />
      </Wrapper>
    );


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
            {loadingEmailSending ? (
              <ReactLoading
                className="loading-login-screen-style"
                type="bars"
                color="#09629E"
                height={"20%"}
                width={"20%"}
              />
              
              ) : (
              <BtnAvaliation type='submit' onClick={sendEmail}>Enviar</BtnAvaliation>
            )}
        </Wrapper>
        
    )
}
export default RefuseRequest;