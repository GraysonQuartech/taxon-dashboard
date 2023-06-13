/** @format */

//IMPORT React packages and components
import React from "react";
import Main from "./components/Main";
import "./utils/globalStyles.css";

//IMPORT MUI packages
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import { TaxonContextProvider } from "./contexts/taxonContext";
import { DataContextProvider } from "./contexts/dataContext";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
      light: "#111111",
      dark: "#003366", // BC ID: corporate blue
    },
    secondary: {
      main: blueGrey[600],
      light: blueGrey[50],
      dark: "#999999",
    },
  },
  spacing: 4,
  typography: {
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    fontFamily: ["BCSans", "Verdana", "Arial", "sans-serif"].join(","),
  },
});

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={globalTheme}>
      <DataContextProvider>
        <TaxonContextProvider>
          <Main />
        </TaxonContextProvider>
      </DataContextProvider>
    </ThemeProvider>
  );
};

export default App;
