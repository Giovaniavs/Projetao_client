import 'antd/dist/antd.css';
import "./starRating.css"

import { BtnAvaliation, ProfilePic, Wrapper } from './styles';
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Rate } from 'antd';
import ReactLoading from "react-loading";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import seguranca from "./img/seguranca.png"
import { useAuth } from '../../firebase';
import { useHistory } from "react-router-dom";
import userQueryParams from '../Perfil/userQueryParams';

const Avaliacao=()=>{
  let query = userQueryParams();
  const emailPerfil = query.get("email");
  const {setFeedbacks, updateConnections, getUserProfile} = useAuth();
    const email = localStorage.getItem("emailAvaliado")
    const strObj = JSON.parse(localStorage.getItem("userInfo"))
    const imgAvalido = localStorage.getItem("urlAvaliado")
   const [feedback,setFeedback] = useState('');
   const [points,setPoints] = useState('')
   const [isLoading,setIsLoading] = useState(false)
   const author = strObj.name   
   let history = useHistory();
   const [currentUser, setCurrentUser] = useState({});
   const [currentUserLogged, setCurrentUserLogged] = useState({});

   useEffect(() => {
      getUserInfo();
      
    }, []);

    const getUserInfo = () => {
      getUserProfile(email)
        .then((user) => {
          setCurrentUser(user.data());
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

        setCurrentUserLogged(JSON.parse(localStorage.getItem("userInfo")));
    };





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
                await updateConnections(currentUserLogged.email,email,'-1')
                history.push("/home")

              }
            }}   >Avaliar</BtnAvaliation>
            )

            }
            
            
        </Wrapper>
        
    )
}
export default Avaliacao;