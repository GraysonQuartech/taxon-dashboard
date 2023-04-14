// IMPORT React packages and components
import React, { useState } from "react";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import { taxonInterface } from "../utils/datagrab";
// IMPORT MUI packages
import TextField from "@mui/material/TextField";
// IMPORT Constants + Data + Helper Functions

/*
 * Main component function here
 * This component contains all other components
 */
interface SelectedTaxon {
  taxon_name_latin: string;
  taxon_id: string;
}

const Main = (): JSX.Element => {
  // HOOKS here
  const [selectedTaxon, setSelectedTaxon] = useState<SelectedTaxon | null>(null);

  // HOOK CALL BACKS here
  const handleTaxonFromFilterRow = (taxon: taxonInterface | null): void => {
    if (taxon != null) {
      setSelectedTaxon(taxon);
    }
  };

  // RETURN ELEMENT HERE
  return (
    <div>
      <TaxonDisplay />
      <FilterRow onTaxonSelected={handleTaxonFromFilterRow} />
    </div>
  );
};

export default Main;
