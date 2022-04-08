import React, { useState } from 'react';
import fire from '../../firebase';  
import './RegisterScreen.css';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ReactLoading from 'react-loading';



const RegisterScreen = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [shouldRedirectToLogin,setShouldRedirectToLogin] = useState(false);
  const [isLoading,setIsLoading] = useState(false);


  const clearErrors = () =>{
    setEmailError('');
    setPasswordError('');
  }


  const handleSignup = () =>{
    setIsLoading(true);
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(
        () => {
          createUser(email,password);
          setShouldRedirectToLogin(true);
        }
      )
      .catch(err =>{
        switch(err.code){
          case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              setIsLoading(false);
              break;
              case "auth/weak-password":
                setPasswordError(err.message);
                setIsLoading(false);
                break;
                default:
                  break;
                }
          },
        )
        
              
  };

  const createUser = (email, password) => {
    fire.firestore().collection("user").add({email, password});
  }

  if (shouldRedirectToLogin) {
    return(
      <Redirect push to="/" />
    );
  }


  return (
    <div className = 'register-screen'>
      <div className = 'register-box-style'>
        <p className = 'label-register-box-style'>Nome</p>
        <TextField
            required
            fullWidth
            margin='normal'
            id="outlined-required"
            onChange={(value) => setEmail(value.target.value)} 
        />
        <p>{emailError}</p>
      </div>
      <div className = 'register-box-style'>
        <p className = 'label-register-box-style'>Data de nascimento</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          onChange={(value) => setPassword(value.target.value)} 
        />
        <p>{passwordError}</p>
      </div>
      <div className = 'register-box-style'>
        <p className = 'label-register-box-style'>Identidade de gênero</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
        />
      </div>
      <div className = 'register-box-style'>
        <p className = 'label-register-box-style'>Endereço</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
        />
      </div>
        

        
        


        {isLoading ? (
            <ReactLoading className='loading-login-screen-style' type='bars' color='#09629E' height={'20%'} width={'20%'} />
            ) : (
              <button onClick={handleSignup} className="create-account-button">Cadastrar</button>
        )}
    </div>
  );
};
  
export default RegisterScreen;