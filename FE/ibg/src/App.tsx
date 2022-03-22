import React from "react";
import Router from "./Router";
import { CustomTheme } from "./component/CustomTheme";

import { ThemeProvider } from "@emotion/react";

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
