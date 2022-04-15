import React, { useEffect, useState, useContext } from 'react';
import logo from '../../assets/images/logo.svg';
import './LoginScreen.css';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { UserContext } from '../../contexts/userContext';

import { useAuth } from '../../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [shouldRedirectToRegister, setShouldRedirectToRegister] = useState(false);
  const [shouldRedirectToApp, setShouldRedirectToApp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, findUser } = useAuth()

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    setIsLoading(true);
    clearErrors();
    signIn(email, password).then((data) => {
      switch (data) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(data);
          setIsLoading(false);
          break;
        case "auth/wrong-password":
          setPasswordError(data);
          setIsLoading(false);
          break;
        default:
          setShouldRedirectToApp(true);
          break;
      }
    })
  };

  useEffect(() => {
    findUser(email)

  }, [setUserInfo, shouldRedirectToApp]);


  if (shouldRedirectToRegister) {
    return (
      <Redirect push to="/register" />
    );
  }

  if (shouldRedirectToApp) {
    return(
      <Redirect push to="/home" />
    );
  }


  return (
    <div className='IsLogged'>
      <section className='login'>
        <div className='loginContainer'>
          <img src={logo} alt="Logo da plataforma" />
          <strong>Acesse sua conta</strong>
          <label>E-mail</label>
          <input
            type='text'
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          <label>Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errorMsg">{passwordError}</p>
          <div className="btnContainer">
            <>
              {isLoading ? (
                <ReactLoading className='loading-login-screen-style' type='bars' color='#09629E' height={'20%'} width={'20%'} />
              ) : (
                <button onClick={handleLogin} className="BotaoEntrar">Entrar</button>
              )}
              <p> Não tem uma conta? <span onClick={() => setShouldRedirectToRegister(true)}>Cadastre-se</span></p>
            </>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginScreen;