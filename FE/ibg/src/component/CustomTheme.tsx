//CustomTheme.tsx
import { createTheme } from "@mui/material/styles";

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#67B6FF",
    },
    error: {
      main: "#FF2E00",
    },
    warning: {
      main: "#FCB500",
    },
  },
});

export { CustomTheme };
