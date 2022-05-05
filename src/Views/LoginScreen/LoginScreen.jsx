import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import './LoginScreen.css';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useUser } from '../../contexts/userContext';

import { useAuth } from '../../firebase'

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const { userInfo, setUserInfo } = useUser();
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, findUser } = useAuth()

  const navigate = useNavigate()
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const redirectToRegister = () => {
    navigate('/register')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    clearErrors();

    const userSignIn = await signIn(email, password)
    console.log(userSignIn)
    switch (userSignIn) {
      case "auth/invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
        setEmailError(userSignIn);
        setIsLoading(false);
        break;
      case "auth/wrong-password":
        setPasswordError(userSignIn);
        setIsLoading(false);
        break;
      default:
        setUserInfo(userSignIn)
        if (userSignIn.type === "admin") {
          navigate('/admin')
        } else {
          navigate('/home')
        }

        localStorage.setItem("userInfo", JSON.stringify(userFetched));
        localStorage.setItem("uid", email);
        break;
    }

  };

  return (
    <div className='IsLogged'>
      <section className='login'>
        <div className='loginContainer'>
          <img src={logo} alt="Logo da plataforma" />
          <strong>Acesse sua conta</strong>
          <div className='containerLogin'>
            <form onSubmit={handleLogin}>

              <div className='inputBox'>
                <label>E-mail</label>
                <input
                  type='text'
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
              </div>
              <div className='inputBox'>
                <label>Senha</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
              </div>
              <div className="btnContainer">
                <>
                  {isLoading ? (
                    <ReactLoading className='loading-login-screen-style' type='bars' color='#09629E' height={'20%'} width={'20%'} />
                  ) : (
                    <button type='submit' className="BotaoEntrar">Entrar</button>
                  )}
                  <p> Não tem uma conta? <span onClick={() => redirectToRegister()}>Cadastre-se</span></p>
                </>
              </div>
            </form>
          </div>
        </div>
      </section >
    </div >
  );
};