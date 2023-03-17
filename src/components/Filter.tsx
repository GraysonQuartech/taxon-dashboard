//IMPORT React and Child Components
import * as React from "react";
//IMPORT MUI packages
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles({
  container: {
    padding: "0.5rem",
    display: "block",
  },
  selectbox: {
    backgroundColor: "white",
  },
});

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
interface filterProps {
  classificationLevel: string;
  dropDownTaxons: string[];
  onSelectedChange: (selectedTaxon: string) => void;
}

/*
 * Main component Function.
 * This component is a basic MUI select
 * It receives an array of taxons for the user to select from
 */
const Filter = (props: filterProps): JSX.Element => {
  //HOOKS here
  const [taxon, setTaxon] = React.useState("");
  const classes = useStyles();

  //HOOK CALL BACKS here
  const handleChange = (event: SelectChangeEvent): void => {
    const selectedTaxon = event.target.value as string;
    setTaxon(selectedTaxon);
    props.onSelectedChange(selectedTaxon);
  };

  //RETURN ELEMENT HERE
  return (
    <Box className={classes.container}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{props.classificationLevel}</InputLabel>
        <Select
          className={classes.selectbox}
          labelId="select-label"
          id="select"
          value={taxon}
          label={props.classificationLevel}
          onChange={handleChange}
        >
          {props.dropDownTaxons.map((taxonOption) => (
            <MenuItem value={taxonOption} key={taxonOption}>
              {taxonOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
