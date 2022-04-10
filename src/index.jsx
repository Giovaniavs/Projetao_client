import ReactDOM  from 'react-dom';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useState } from 'react' 
import GlobalStyle from './Global/globalStyle';
import { Perfil } from './Views/Perfil';

import IsLogged from './Views/IsLogged/IsLogged';
import  NavBar  from './Components/NavBar';

function PlataformRotas() {
  return (
    <Switch>
      <Route path="/inicio" component={Perfil}  />
      <Route path="/perfil" component={Perfil} />

    </Switch>
    
  );
}

function App() {
  // const [uuid, setUuid] = useState(localStorage.getItem("uid"));
  let isAuth ='key';

  // const handleLogin = (uuid) => {
  //   setUuid(uuid);
  // };
  // const handleLogOut = () => {
  //   setUuid(null);
  // };

  return (
      <>
        <Router>
          <Switch>
            { isAuth ? (
              <>
              <NavBar />
              <PlataformRotas />
              </>
            ): (
              <>
              <Redirect to='/' />
              <Route component={IsLogged} exact path="/" />
              
              </>
            )}
          </Switch>
        </Router>
        <GlobalStyle />
      </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
