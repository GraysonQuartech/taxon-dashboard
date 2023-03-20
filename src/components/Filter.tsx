//IMPORT React and Child Components
import React, { useState } from "react";
//IMPORT MUI packages
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

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
  classificationLevel: string;
  dropDownTaxons: string[];
  onSelectedChange: (selectedTaxon: string) => void;
}

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles({
  formControl: {
    width: "130%", // increased width from 100% to 80%
  },
  selectBox: {
    backgroundColor: "white",
  },
});

/*
 * Main component Function.
 * This component is a basic MUI select
 * It receives an array of taxons for the user to select from
 */
const Filter = (props: FilterProps) => {
  //HOOKS here
  const [taxon, setTaxon] = useState<string | null>(null);
  const classes = useStyles();

  //HOOK CALL BACKS here
  const handleChange = (newValue: string | null): void => {
    setTaxon(newValue);
    if (newValue) {
      props.onSelectedChange(newValue);
    }
  };

  //RETURN ELEMENT HERE
  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        className={classes.selectBox}
        options={props.dropDownTaxons}
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
    </FormControl>
  );
};

export default Filter;
