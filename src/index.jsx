import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { UserContextProvider } from './contexts/userContext';

import GlobalStyle from './global/globalStyle';

import LoginScreen from './Views/LoginScreen/LoginScreen';
import RegisterScreen from './Views/RegisterScreen/RegisterScreen';



function PlataformRoutes() {
  return (
    <Router>
        <Switch>
          <Route component={RegisterScreen} exact path="/plataform" />
      </Switch>
    </Router>
  );
}

function App() {
  return (
      <>
        <Router>
          <Switch>
            <UserContextProvider>
              <Route component={LoginScreen} exact path="/" />
              <Route component={RegisterScreen} exact path="/register" />
              <Route component={PlataformRoutes} exact path="/(plataform)" />
            </UserContextProvider>
          </Switch>
        </Router>
        <GlobalStyle />
      </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
