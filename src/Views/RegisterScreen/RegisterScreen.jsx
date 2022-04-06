import React, { useState, useEffect } from 'react';
import fire from '../../firebase';  
import './RegisterScreen.css';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';



const RegisterScreen = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [shouldRedirectToLogin,setShouldRedirectToLogin] = useState(false);


  const clearErrors = () =>{
    setEmailError('');
    setPasswordError('');
  }


  const handleSignup = () =>{
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(
        () => {
          setShouldRedirectToLogin(true);
        }
      )
      .catch(err =>{
        switch(err.code){
          case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
              case "auth/weak-password":
                setPasswordError(err.message);
                break;
                default:
                  break;
                }
          },
        )
        
              
  };

  if (shouldRedirectToLogin) {
    return(
      <Redirect to="/" />
    );
  }


  return (
    <div className = 'register-screen'>
      <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          label="Required"
          defaultValue="Nome"
          onChange={(value) => setEmail(value.target.value)} 
        />
        <p>{emailError}</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          label="Required"
          defaultValue="Data de nascimento"
          onChange={(value) => setPassword(value.target.value)} 
        />
        <p>{passwordError}</p>

        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          label="Required"
          defaultValue="Identidade de gênero"
        />
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          label="Required"
          defaultValue="Endereço"
        />

        <button onClick={handleSignup} className="create-account-button">Cadastrar</button>
    </div>
  );
};
  
export default RegisterScreen;