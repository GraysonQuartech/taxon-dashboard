//IMPORT React packages and components
import React, { useState } from "react";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
//IMPORT MUI packages

//IMPORT Constants + Data + Helper Functions
//import { helperGetID } from "../utils/helper_functions";

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
    <div>
      <TaxonDisplay currentTaxon={selectedTaxonName} taxonID={123456} />
      <FilterRow onTaxonSelected={handleTaxonFromFilterRow} />
    </div>
  );
};

export default Main;
