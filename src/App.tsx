/** @format */

//IMPORT React packages and components
import React from "react";
import Main from "./components/Main";
//IMPORT MUI packages
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import { TaxonContextProvider } from "./contexts/taxonContext";

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
  typography: {
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={globalTheme}>
      <TaxonContextProvider>
        <Main />
      </TaxonContextProvider>
    </ThemeProvider>
  );
};

export default App;
