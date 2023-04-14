//IMPORT React and Child Components
import React, { useState } from "react";
import { useTaxon } from "../contexts/taxonContext";
//IMPORT MUI packages
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
//IMPORT Datasets+Constants
import { taxonInterface } from "../utils/datagrab";
import { TaxonLevel, classificationLevelArray } from "../utils/constants";
//IMPORT helper functions
import {
  helperGetClassificationLevel,
  helperIsHigherClassificationLevel,
} from "../utils/helper_functions";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  formControl: {
    width: "100%",
  },
  selectBox: {
    backgroundColor: globalTheme.palette.secondary.light,
  },
}));

/*
 * PARENT COMPONENT: FilterRows.tsx
 * Props received from parent:
 *   classificationLevel:
 *      The taxon classification... kingdown, phylum etc
 *   dropDownTaxons:
 *      The taxon options corresponding to the classificationLevel
 * onSelectedChange:
 *      When a filters value is changed, the value is passed up to
 *      the parent component.
 */
interface FilterProps {
  classificationLevel: TaxonLevel;
  dropDownTaxons: taxonInterface[];
  //onSelectedChange: (selectedTaxon: taxonInterface | null) => void;
}

/*
 * Main component Function.
 * This component is a basic MUI select
 * It receives an array of taxons for the user to select from
 */
const Filter = (props: FilterProps) => {
  //HOOKS here
  let { selectedTaxon, setSelectedTaxon } = useTaxon();
  const [taxon, setTaxon] = useState<taxonInterface | null>(null);

  const classes = useStyles();

  //HOOK CALL BACKS here. called when
  const handleTaxonChange = (newTaxonValue: taxonInterface | null): void => {
    setTaxon(newTaxonValue);
    //props.onSelectedChange(newTaxonValue);
    setSelectedTaxon(newTaxonValue);

    //if selectedTaxon not null
    if (selectedTaxon) {
      const selectedTaxonClassificationLevel =
        helperGetClassificationLevel(selectedTaxon);
      //if contextTaxon classification level higher than this current filters, set this filter value to null/blank
      if (
        selectedTaxonClassificationLevel &&
        helperIsHigherClassificationLevel(
          props.classificationLevel,
          selectedTaxonClassificationLevel
        )
      ) {
      }
      //else if contextTaxon clasification level lower than current filter, find what this value should be + set this current filter to that value
      else {
      }
    }
  };

  //RETURN ELEMENT HERE
  return (
    <Autocomplete
      className={classes.selectBox}
      options={props.dropDownTaxons.filter((t) => t.taxon_name_latin !== null)}
      getOptionLabel={(option) => option.taxon_name_latin || ""}
      value={taxon}
      onChange={(event, newTaxonValue) => handleTaxonChange(newTaxonValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.classificationLevel}
          variant="outlined"
        />
      )}
    />
  );
};

export default Filter;
