import React, { useState } from "react";
import FilterRow from "./components/FilterRow";
import TaxonDisplay from "./components/TaxonDisplay";

const App = () => {
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
    <div>
      <TaxonDisplay currentTaxon={selectedTaxon} taxonID={123456} />
      <FilterRow onTaxonSelected={handleTaxonFromFilterRow} />
    </div>
  );
};

export default App;
