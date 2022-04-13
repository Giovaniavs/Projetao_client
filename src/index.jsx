import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { UserContextProvider } from "./contexts/userContext";
import { ListSecurtyContextProvider } from "./contexts/ListSecurity";

import GlobalStyle from "./global/globalStyle";

import LoginScreen from "./Views/LoginScreen/LoginScreen";
import RegisterScreen from "./Views/RegisterScreen/RegisterScreen";

import NavBar from "./components/NavBar/index";
import Home from "./Views/Home";

function PlataformRoutes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route component={Home} exact path="/home" />
        <Route component={RegisterScreen} exact path="/plataform" />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ListSecurtyContextProvider>
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
    </ListSecurtyContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
