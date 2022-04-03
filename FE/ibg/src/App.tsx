import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ThemeProvider } from "@emotion/react";
import { CustomTheme } from "./component/CustomTheme";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./component/layout/NavBar";
import Footer from "./component/layout/Footer";

declare global {
  interface Window {
    kakao: any;
  }
}
function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />

      <BrowserRouter>
        <NavBar />
        <Router />
        {window.location.pathname === "/survey" ? null : <Footer />}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
