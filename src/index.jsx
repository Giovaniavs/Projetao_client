import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// Capacitor
import { StatusBar, Style } from "@capacitor/status-bar";

import Avaliacao from "./Views/Avaliacao/Avaliacao";
import GlobalStyle from "./global/globalStyle";
import ListRequestRegisterSecurity from "./Views/Admin/Admin";
import { ListRequestRegisterSecurtyContextProvider } from "./contexts/ListRequestRegisterGuards";
import ListSecurity from "./components/ListSecurity/ListSecurity";
import { ListSecurtyContextProvider } from "./contexts/ListSecurity";
import LoginScreen from "./Views/LoginScreen/LoginScreen";
import NavBar from "./components/NavBar/index";
import { PaymentScreen } from "./Views/PaymentFlow/PaymentScreen";
import Perfil from "./Views/Perfil";
import PerfilRequestRegister from "./Views/PerfilRequestRegister/PerfilRequestRegister";
import { PlanSelector } from "./Views/PaymentFlow/PlanSelector";
import ReactDOM from "react-dom";
import RefuseRequest from "./Views/RefuseRequest/RefuseRequest";
import RegisterScreen from "./Views/RegisterScreen/RegisterScreen";
import { ShopkeeperPayment } from './Views/PaymentFlow/ShopkeeperPayment'
import { UserContextProvider } from "./contexts/userContext";

StatusBar.setOverlaysWebView({ overlay: false }).catch(() => { });
StatusBar.setStyle({ style: Style.Dark }).catch(() => { });
StatusBar.setBackgroundColor({ color: "#1976d2" }).catch(() => { });

// Aqui você define todas as rotas que serão utilizadas dentro da plataforma quando o usuário estiver logado
// Depois que você criar uma rota aqui, você obrigatoriamente precisa adicionar ela dentro do parentesis da terceira Route da função App() deste mesmo arquivo.
function PlataformRoutes() {
  return (
    <Router>
      <ListRequestRegisterSecurtyContextProvider>
        <ListSecurtyContextProvider>
          <UserContextProvider>
            <NavBar />
            <Switch>
              <Route component={ListSecurity} exact path="/home" />
              <Route component={ListRequestRegisterSecurity} exact path="/admin" />
              <Route component={Perfil} exact path="/perfil" />
              <Route component={Avaliacao} exact path="/avaliacao" />
              <Route component={PerfilRequestRegister} exact path="/perfilVerificacao" />
              <Route component={RefuseRequest} exact path="/recusar" />
              <Route component={PlanSelector} exact path="/planSelector" />
              <Route component={PaymentScreen} exact path="/paymentScreen" />
              <Route component={ShopkeeperPayment} exact path="/shopkeeperPayment" />
              <Route   path="/conections" >
                <>ola </>
              </Route>
            </Switch>
          </UserContextProvider>
        </ListSecurtyContextProvider>
      </ListRequestRegisterSecurtyContextProvider>
    </Router>
  );
}

// Aqui você define todas as rotas que serão utilizadas quando o usuário não estiver logado
// OBS: Depois que você criar uma rota na PlatformRoutes, você obrigatoriamente precisa adionar ela na
// terceira Route dentro dos parêntesis, seguindo sempre o padrão /(rotaUm|rotaDois|rotaTrês) divididos pela barra reta |
function App() {
  return (
    <>
      <Router>
        <Switch>
          <UserContextProvider>
            <Route component={LoginScreen} exact path="/" />
            <Route component={RegisterScreen} exact path="/register" />
            <Route component={PlataformRoutes} exact path="/(home|avaliacao|perfil|admin|perfilVerificacao|recusar|planSelector|paymentScreen|shopkeeperPayment|conections)" />
          </UserContextProvider>
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
