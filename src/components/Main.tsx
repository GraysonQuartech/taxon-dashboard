//IMPORT React packages and components
import React, { useState } from "react";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import { taxonInterface } from "../utils/datagrab";
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
  const [selectedTaxonID, setSelectedTaxonID] = useState("");
  //HOOK CALL BACKS here
  const handleTaxonFromFilterRow = (taxon: taxonInterface | null): void => {
    if (taxon != null) {
      setSelectedTaxon(taxon.taxon_name_latin);
      setSelectedTaxonID(taxon.taxon_id);
    }
  };

  //RETURN ELEMENT HERE
  return (
    <div>
      <TaxonDisplay taxonName={selectedTaxonName} taxonID={selectedTaxonID} />
      <FilterRow onTaxonSelected={handleTaxonFromFilterRow} />
    </div>
  );
};

export default Main;
