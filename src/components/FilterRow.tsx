//IMPORT React packages and components
import React from "react";
import Filter from "./Filter";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
//IMPORT Constants + Data
import { testArray } from "../utils/constants";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles({
  grid: {
    backgroundColor: "grey",
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridGap: "5px",
  },
});

/*
 * PARENT COMPONENT: App.tsx
 * Props received from parent:
 *   onTaxonSelected:
 *      this is a function callback. when a taxon has been selected from Filter.tsx
 *      this callback is passed to FilterRow.tsx parent
 */
interface FilterRowProps {
  onTaxonSelected: (taxon: string) => void;
}

/*
 * Main component Function.
 * This component maps data to 8 MUI select components.
 */
const FilterRow = (props: FilterRowProps): JSX.Element => {
  //HOOKS here
  const classes = useStyles();

  //HOOK CALL BACKS here
  const handleTaxonSelected = (taxon: string): void => {
    props.onTaxonSelected(taxon);
  };

  //RETURN ELEMENT HERE
  return (
    <div className={classes.grid}>
      <Filter
        classificationLevel={"Kingdom"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
      <Filter
        classificationLevel={"Phylum"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
      <Filter
        classificationLevel={"Class"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
      <Filter
        classificationLevel={"Order"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
      <Filter
        classificationLevel={"Family"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
      <Filter
        classificationLevel={"Genus"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
      <Filter
        classificationLevel={"Species"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
      <Filter
        classificationLevel={"Sub-Species"}
        dropDownTaxons={testArray}
        onSelectedChange={handleTaxonSelected}
      />
    </div>
  );
};

export default FilterRow;
