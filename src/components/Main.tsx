//IMPORT React packages and components
import React, { useState } from "react";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
//IMPORT MUI packages
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
//IMPORT Constants + Data + Helper Functions
//import { helperGetID } from "../utils/helper_functions";

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

/*
 * Main component function here
 * This component contains all other components
 */
const Main = (): JSX.Element => {
  //HOOKS here
  const [selectedTaxonName, setSelectedTaxon] = useState("");
  //HOOK CALL BACKS here
  const handleTaxonFromFilterRow = (taxon: string): void => {
    setSelectedTaxon(taxon);
  };

  //RETURN ELEMENT HERE
  return (
    <ThemeProvider theme={globalTheme}>
      <TaxonDisplay currentTaxon={selectedTaxonName} taxonID={123456} />
      <FilterRow onTaxonSelected={handleTaxonFromFilterRow} />
    </ThemeProvider>
  );
};

export default Main;
