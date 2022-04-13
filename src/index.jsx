import ReactDOM  from 'react-dom';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useState } from 'react' 
import GlobalStyle from './global/globalStyle';
import { Perfil } from './Views/Perfil';
import {Avaliacao, Test} from './Views/avaliation-security ';

import IsLogged from './Views/IsLogged/IsLogged';
import  NavBar  from './Components/NavBar';
// import Home from './Views/Home';
import { ListSecurtyContextProvider } from './contexts/ListSecurity';

function PlataformRotas() {
 
  return (
    <Switch>
      <Route path="/initial" component={Perfil}  />
      <Route path="/profile" component={Perfil} />
      <Route component={Avaliacao} exact path="/avalicao" />
      {/* <Route path="/home" component={Home} /> */}

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
      <ListSecurtyContextProvider>
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
      </ListSecurtyContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
