//IMPORT React packages and components
import React from "react";
import Filter from "./Filter";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { Theme } from "@mui/material";
//IMPORT Constants + Data
import { testArray } from "../utils/constants";
import data from "../datasets/taxon_data.json";

interface taxonInterface {
  lk_taxon: {
    taxon_id: string;
    kingdom_id: string | null;
    phylum_id: string | null;
    class_id: string | null;
    order_id: string | null;
    family_id: string | null;
    genus_id: string | null;
    species_id: string | null;
    sub_species_id: string | null;
    taxon_name_common: string | null;
    taxon_name_latin: string;
    spi_taxonomy_id: number;
    taxon_description: string | null;
    create_user: string;
    update_user: string;
    create_timestamp: string;
    update_timestamp: string;
  }[];
}

const myData: taxonInterface = data;
const lkTaxon = myData.lk_taxon;

function getLatinNamesWithNullKingdom(data: taxonInterface): string[] {
  const latinNames: string[] = data.lk_taxon
    .filter((item) => item.kingdom_id === null)
    .map((item) => item.taxon_name_latin);

  return latinNames;
}
//const myData: taxonInterface = data;
const latinNamesWithNullKingdom = getLatinNamesWithNullKingdom(myData);

console.log(latinNamesWithNullKingdom);

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
    { classificationLevel: "Kingdom", dropDownTaxons: testArray },
    { classificationLevel: "Phylum", dropDownTaxons: testArray },
    { classificationLevel: "Class", dropDownTaxons: testArray },
    { classificationLevel: "Order", dropDownTaxons: testArray },
    { classificationLevel: "Family", dropDownTaxons: testArray },
    { classificationLevel: "Genus", dropDownTaxons: testArray },
    { classificationLevel: "Species", dropDownTaxons: testArray },
    { classificationLevel: "Sub-Species", dropDownTaxons: testArray },
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
