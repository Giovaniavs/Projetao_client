import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react'
import GlobalStyle from './global/globalStyle';
import { Perfil } from './Views/Perfil';

import IsLogged from './Views/IsLogged/IsLogged';
import NavBar from './Components/NavBar';

//Capacitor
import { StatusBar, Style } from '@capacitor/status-bar';
StatusBar.setOverlaysWebView({ overlay: false });
StatusBar.setStyle({ style: Style.Dark });
StatusBar.setBackgroundColor({color:'#1976d2'})

function PlataformRotas() {

  return (
    <Switch>
      <Route path="/initial" component={Perfil} />
      <Route path="/profile" component={Perfil} />

    </Switch>

  );
}

function App() {
  // const [uuid, setUuid] = useState(localStorage.getItem("uid"));
  let isAuth = 'key';

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
          {isAuth ? (
            <>
              <NavBar />
              <PlataformRotas />
            </>
          ) : (
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
