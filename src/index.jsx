import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { UserContextProvider } from "./contexts/userContext";
import { ListSecurtyContextProvider } from "./contexts/ListSecurity";

import GlobalStyle from "./global/globalStyle";

import LoginScreen from "./Views/LoginScreen/LoginScreen";
import RegisterScreen from "./Views/RegisterScreen/RegisterScreen";
import Avaliacao from "./Views/Avaliacao/Avaliacao";

import NavBar from "./components/NavBar/index";

import ListSecurity from "./components/ListSecurity/ListSecurity";

// Capacitor
import { StatusBar, Style } from "@capacitor/status-bar";
import Perfil from "./Views/Perfil";

StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
StatusBar.setBackgroundColor({ color: "#1976d2" }).catch(() => {});

// Aqui você define todas as rotas que serão utilizadas dentro da plataforma quando o usuário estiver logado
// Depois que você criar uma rota aqui, você obrigatoriamente precisa adicionar ela dentro do parentesis da terceira Route da função App() deste mesmo arquivo.
function PlataformRoutes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <UserContextProvider>
          <Route component={ListSecurity} exact path="/home" />
          <Route component={Perfil} exact path="/perfil" />
          <Route component={Avaliacao} exact path="/avaliacao" />
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

// Aqui você define todas as rotas que serão utilizadas quando o usuário não estiver logado
// OBS: Depois que você criar uma rota na PlatformRoutes, você obrigatoriamente precisa adionar ela na
// terceira Route dentro dos parêntesis, seguindo sempre o padrão /(rotaUm|rotaDois|rotaTrês) divididos pela barra reta |
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
