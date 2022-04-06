import React, { useState, useEffect } from 'react';
import fire from '../../firebase';  
import logo from '../../assets/images/logo.svg';
import './LoginScreen.css';
import { Redirect } from 'react-router-dom';


const LoginScreen = () => {
  const [user,setUser] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [shouldRedirectToRegister,setShouldRedirectToRegister] = useState(false);

  const clearInputs = () =>{
    setEmail('');
    setPassword('');
  }

  const clearErrors = () =>{
    setEmailError('');
    setPasswordError('');
  }
 
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err =>{
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break; 
          default:
            break;
        }
      });
  };

  const handleSignup = () =>{
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
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
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authListener = () =>{
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  
  useEffect (() => {
    authListener();
  }, [authListener]);

  if (shouldRedirectToRegister) {
    return(
      <Redirect to="/register" />
    );
  }

  

  return (
    <div className = 'IsLogged'>
        <section className = 'login'>
            <div className= 'loginContainer'>
                <img src ={logo} alt="Logo da plataforma"/>
                <strong>Acesse sua conta</strong>
                <label>E-mail</label>
                <input 
                    type = 'text'
                    autoFocus
                    required
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Senha</label>
                <input 
                    type = "password" 
                    required 
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    <>
                        <button onClick={handleLogin} className="BotaoEntrar">Entrar</button>
                        <p> Não tem uma conta? <span onClick={() => setShouldRedirectToRegister(true)}>Cadastre-se</span></p>
                    </>
                </div>
            </div>
        </section>
    </div>
  );
};
  
export default LoginScreen;