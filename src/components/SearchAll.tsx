/** @format */
//IMPORT React and Child Components
import React, { useState, useEffect } from "react";
import { useTaxon } from "../contexts/taxonContext";
//IMPORT MUI packages
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
//IMPORT Datasets+Constants
import { taxonInterface } from "../utils/datagrab";
import { classificationLevelArray } from "../utils/constants";
//IMPORT helper functions
import { helperGetClassificationLevel } from "../utils/helper_functions";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  formControl: {
    width: "100%",
  },
  selectBox: {
    backgroundColor: "#ffffff",
    borderRadius: "5px",
  },
}));

/*
 * PARENT COMPONENT: Main.tsx
 * Props received from parent:
 *   dropDownTaxons:
 *      All dropDownTaxon options within dataset
 */
interface FilterProps {
  dropDownTaxons: taxonInterface[];
}

/*
 * Main component Function.
 * This component is a basic MUI autocomplete
 * It receives an array of taxons for the user to select from
 */
const SearchAll = (props: FilterProps) => {
  //HOOKS here
  let { contextTaxon, setContextTaxon } = useTaxon();
  const [filterTaxon, setFilterTaxon] = useState<taxonInterface | null>(null);
  const classes = useStyles();

  /*
  Sorts the drop down list to have categories
  */
  const sortedOptions = props.dropDownTaxons
    .filter((t) => t.taxon_name_latin != null)
    .sort((a, b) => {
      const aClassificationLevel = helperGetClassificationLevel(a);
      const bClassificationLevel = helperGetClassificationLevel(b);

      // Check for null values before accessing taxon_name_latin property
      if (aClassificationLevel !== null && bClassificationLevel !== null) {
        return (
          classificationLevelArray.indexOf(aClassificationLevel) -
          classificationLevelArray.indexOf(bClassificationLevel)
        );
      }
      return 0;
    });

  /*
   *Gets called when context taxon updated anywhere. updates search bar to null
   */
  useEffect(() => {
    if (contextTaxon != filterTaxon) {
      setFilterTaxon(null);
    }
  }, [contextTaxon]);
  /*
   * Receives the new filterTaxon value selected from the drop downs
   * gets called when a filter value changed to a different filterTaxon/null
   */
  const handleTaxonChange = (selectedTaxon: taxonInterface | null) => {
    setFilterTaxon(selectedTaxon);
    if (selectedTaxon) {
      setContextTaxon(selectedTaxon);
    }
  };
  //RETURN ELEMENT HERE
  return (
    <Autocomplete
      className={classes.selectBox}
      options={sortedOptions}
      getOptionLabel={(option) => option.taxon_name_latin || ""}
      value={filterTaxon}
      groupBy={(option) => helperGetClassificationLevel(option) as string}
      onChange={(event, newTaxonValue) => handleTaxonChange(newTaxonValue)}
      renderInput={(params) => <TextField {...params} label={"Search All Taxons"} variant="outlined" />}
    />
  );
};

export default SearchAll;
