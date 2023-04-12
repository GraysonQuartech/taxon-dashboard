//IMPORT React and Child Components
import React, { useState } from "react";
//IMPORT MUI packages
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
//IMPORT Datasets+Constants
import { taxonInterface } from "../utils/datagrab";

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
 */ interface FilterProps {
  classificationLevel: string;
  dropDownTaxons: taxonInterface[];
  onSelectedChange: (selectedTaxon: taxonInterface | null) => void;
}

/*
 * Main component Function.
 * This component is a basic MUI select
 * It receives an array of taxons for the user to select from
 */
const Filter = (props: FilterProps) => {
  //HOOKS here
  const [taxon, setTaxon] = useState<taxonInterface | null>(null);
  const classes = useStyles();

  //HOOK CALL BACKS here
  const handleChange = (newValue: taxonInterface | null): void => {
    setTaxon(newValue);
    props.onSelectedChange(newValue);
  };

  //RETURN ELEMENT HERE
  return (
    <Autocomplete
      className={classes.selectBox}
      options={props.dropDownTaxons.filter((t) => t.taxon_name_latin !== null)}
      getOptionLabel={(option) => option.taxon_name_latin || ""}
      value={taxon}
      onChange={(event, newValue) => handleChange(newValue)}
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
