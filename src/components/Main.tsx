//IMPORT React packages and components
import React, { useState } from "react";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
//IMPORT MUI packages
import { createTheme, ThemeProvider } from "@material-ui/core";
import { blue, blueGrey } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
  },
});

const Main = (): JSX.Element => {
  //HOOKS here
  const [selectedTaxon, setSelectedTaxon] = useState("");

  //HOOK CALL BACKS here
  const handleTaxonFromFilterRow = (taxon: string): void => {
    setSelectedTaxon(taxon);
  };

  /*
   * Main component Function.
   * This is the parent component. contains all other components
   */
  return (
    <ThemeProvider theme={theme}>
      <TaxonDisplay currentTaxon={selectedTaxon} taxonID={123456} />
      <FilterRow onTaxonSelected={handleTaxonFromFilterRow} />
    </ThemeProvider>
  );
};

export default Main;
