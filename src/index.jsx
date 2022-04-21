import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { UserContextProvider } from "./contexts/userContext";
import { ListSecurtyContextProvider } from "./contexts/ListSecurity";

import GlobalStyle from "./global/globalStyle";

import LoginScreen from "./Views/LoginScreen/LoginScreen";
import RegisterScreen from "./Views/RegisterScreen/RegisterScreen";
import Avaliacao from "./Views/Avaliacao/Avaliacao";
import Home from "./Views/Home";

import NavBar from "./components/NavBar/index";

import ListSecurity from "./components/ListSecurity/ListSecurity";

// Capacitor
import { StatusBar, Style } from "@capacitor/status-bar";
import Perfil from "./Views/Perfil";
import { Link } from "@mui/material";

StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
StatusBar.setBackgroundColor({ color: "#1976d2" }).catch(() => {});

function PlataformRoutes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <UserContextProvider>
          <Route component={Home} exact path="/home" />
          <Route component={Perfil} exact path="/perfil" />
          <Route component={Avaliacao} exact path="/avaliacao" />
        </UserContextProvider>
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
            <Route component={PlataformRoutes} exact path="/(home|avaliacao|perfil)" />
          </UserContextProvider>
        </Switch>
      </Router>
      <GlobalStyle />
    </ListSecurtyContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
