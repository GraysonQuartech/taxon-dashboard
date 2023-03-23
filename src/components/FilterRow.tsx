//IMPORT React packages and components
import React from "react";
import Filter from "./Filter";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { Theme } from "@mui/material";
//IMPORT Constants + Data + Helper Functions
import { helperGetLatinNames } from "../utils/helper_functions";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  gridClass: {
    backgroundColor: globalTheme.palette.primary.light,
    padding: globalTheme.spacing(1),
  },
}));

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
 * This component maps data to MUI select components.
 */
const FilterRow = (props: FilterRowProps): JSX.Element => {
  //HOOKS here
  const classes = useStyles();

  //HOOK CALL BACKS here
  const handleTaxonSelected = (taxon: string): void => {
    props.onTaxonSelected(taxon);
  };

  //DATA here
  const filters = [
    {
      classificationLevel: "Kingdom",
      dropDownTaxons: helperGetLatinNames("Kingdom"),
    },
    {
      classificationLevel: "Phylum",
      dropDownTaxons: helperGetLatinNames("Phylum"),
    },
    {
      classificationLevel: "Class",
      dropDownTaxons: helperGetLatinNames("Class"),
    },
    {
      classificationLevel: "Order",
      dropDownTaxons: helperGetLatinNames("Order"),
    },
    {
      classificationLevel: "Family",
      dropDownTaxons: helperGetLatinNames("Family"),
    },
    {
      classificationLevel: "Genus",
      dropDownTaxons: helperGetLatinNames("Genus"),
    },
    {
      classificationLevel: "Species",
      dropDownTaxons: helperGetLatinNames("Species"),
    },
    {
      classificationLevel: "Sub-Species",
      dropDownTaxons: helperGetLatinNames("Sub_Species"),
    },
  ];

  //RETURN ELEMENT HERE
  return (
    <Grid container columns={8} spacing={2} className={classes.gridClass}>
      {filters.map((filter, index) => (
        <Grid item xs={1} key={index}>
          <Filter
            classificationLevel={filter.classificationLevel}
            dropDownTaxons={filter.dropDownTaxons}
            onSelectedChange={handleTaxonSelected}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FilterRow;
