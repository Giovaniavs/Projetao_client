import React from 'react';
import logo from '../../assets/images/logo.svg';
import '../IsLogged/IsLogged.css'

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError, 
        passwordError,
    } = props;

    return(
        <div>
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
                    {!hasAccount ? (
                        <>
                            <button onClick={handleLogin} className="BotaoEntrar">Entrar</button>
                            <p> Não tem uma conta? <span onClick={() => setHasAccount(!hasAccount)}>Cadastre-se</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup} className="BotaoEntrar">Cadastrar</button>
                            <p>Já tem uma conta? <span onClick={() => setHasAccount(!hasAccount)}>Entrar</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
        </div>
    );
};

export default Login;