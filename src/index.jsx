import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import GlobalStyle from './global/globalStyle';

import LoginScreen from './Views/LoginScreen/LoginScreen';
import RegisterScreen from './Views/RegisterScreen/RegisterScreen';



function PlataformRoutes() {
  return (
    <Router>
        <Switch>

      </Switch>
    </Router>
  );
}

function App() {
  return (
      <>
        <Router>
          <Switch>
            <Route component={LoginScreen} exact path="/" />
            <Route component={RegisterScreen} exact path="/register" />
            <Route component={RegisterScreen} exact path="/plataform" />
          </Switch>
        </Router>
        <GlobalStyle />
      </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
