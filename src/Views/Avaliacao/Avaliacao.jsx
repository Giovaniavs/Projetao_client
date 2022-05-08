import 'antd/dist/antd.css';
import "./starRating.css"

import { BtnAvaliation, ProfilePic, Wrapper } from './styles';
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Rate } from 'antd';
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
          setLoading(true);
          setCurrentUser(user.data());
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          setLoading(false);
        });

        setCurrentUserLogged(JSON.parse(localStorage.getItem("userInfo")));
    };





    return(
        
        <Wrapper>
          
            {
                imgAvalido?(<>

                        
                            <ProfilePic src={imgAvalido}/> 

                </>):(<>
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
            <BtnAvaliation type='submit' onClick={()=>{
              console.log('logado', currentUserLogged)
              console.log('perfil', emailPerfil)
              if(email != ''){
                setFeedbacks(author,feedback,points, email)
                updateConnections(currentUserLogged.email,emailPerfil,'-1')
                history.push(`/perfil?email=${email}`)

              }
            }}   >Avaliar</BtnAvaliation>
        </Wrapper>
        
    )
}
export default Avaliacao;