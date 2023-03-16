//IMPORT React and Child Components
import * as React from "react";
//IMPORT MUI packages
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";

/*
 * PARENT COMPONENT: FilterRows.tsx
 * Props received from parent:
 *   classificationLevel:
 *      The taxon classification... kingdown, phylum etc
 *   dropDownTaxons:
 *      The taxon options corresponding to the classificationLevel
 */
interface filterProps {
  classificationLevel: string;
  dropDownTaxons: string[];
}

/*
 * Main component Function.
 * This component is a basic MUI select
 * It receives an array of taxons for the user to select from
 */
const Filter = (props: filterProps) => {
  const [taxon, setTaxon] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setTaxon(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{props.classificationLevel}</InputLabel>
        <Select
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
