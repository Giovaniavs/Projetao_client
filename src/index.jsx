import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import GlobalStyle from './global/globalStyle';


import IsLogged from './Views/IsLogged/IsLogged';


function PlataformRotas() {
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
            <Route component={IsLogged} exact path="/" />
          </Switch>
        </Router>
        <GlobalStyle />
      </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
