import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { CustomTheme } from "./component/CustomTheme";

import { ThemeProvider } from "@emotion/react";

import NavBar from "./component/layout/NavBar";

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <BrowserRouter>
        <NavBar />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
