import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from "./global/globalStyle";

// Capacitor
import { StatusBar, Style } from "@capacitor/status-bar";
import { GlobalContext } from "./contexts/GlobalContexts";
import { GlobalRouter } from "./router";
import { BrowserRouter } from "react-router-dom";


StatusBar.setOverlaysWebView({ overlay: false }).catch(() => { });
StatusBar.setStyle({ style: Style.Dark }).catch(() => { });
StatusBar.setBackgroundColor({ color: "#1976d2" }).catch(() => { });

function App() {
  return (
    <>
      <GlobalContext>
        <BrowserRouter>
          <GlobalRouter />
          <GlobalStyle />
        </BrowserRouter>
      </GlobalContext>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
