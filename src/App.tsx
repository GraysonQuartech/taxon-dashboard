//IMPORT React packages and components
import React from "react";
import Main from "./components/Main";
//IMPORT MUI packages
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
      light: blue[50],
    },
    secondary: {
      main: blueGrey[600],
      light: blueGrey[50],
    },
  },
  spacing: 8,
});

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Main />
    </ThemeProvider>
  );
};

export default App;
