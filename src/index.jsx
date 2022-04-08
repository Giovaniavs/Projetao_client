import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { ListSecurtyContextProvider } from './contexts/ListSecurity';

import GlobalStyle from './global/globalStyle';


import IsLogged from './Views/IsLogged/IsLogged';


function PlataformRotas() {
  return (
    <ListSecurtyContextProvider>
      <Router>
          <Switch>
        </Switch>
      </Router>
    </ListSecurtyContextProvider>
  );
}

function App() {
  return (
      <ListSecurtyContextProvider>
        <Router>
          <Switch>
            <Route component={IsLogged} exact path="/" />
          </Switch>
        </Router>
        <GlobalStyle />
      </ListSecurtyContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
