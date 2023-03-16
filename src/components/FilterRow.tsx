//React packages and components
import React from "react";
import Filter from "./Filter";
//Constants + Data
import { testArray } from "../utils/constants";

const FilterRow = (): JSX.Element => {
  return (
    <div>
      <Filter classificationLevel={"Kingdom"} dropDownTaxons={testArray} />
      <Filter classificationLevel={"Phylum"} dropDownTaxons={testArray} />
      <Filter classificationLevel={"Class"} dropDownTaxons={testArray} />
      <Filter classificationLevel={"Order"} dropDownTaxons={testArray} />
      <Filter classificationLevel={"Family"} dropDownTaxons={testArray} />
      <Filter classificationLevel={"Genus"} dropDownTaxons={testArray} />
      <Filter classificationLevel={"Species"} dropDownTaxons={testArray} />
      <Filter classificationLevel={"Sub-Species"} dropDownTaxons={testArray} />
    </div>
  );
};

export default FilterRow;
