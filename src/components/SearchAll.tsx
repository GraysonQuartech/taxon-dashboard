/** @format */

//IMPORT React and Child Components
import React, { useEffect, useState } from "react";
import { useTaxon } from "../contexts/taxonContext";
//IMPORT MUI packages
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
//IMPORT Datasets+Constants
import { taxonInterface } from "../utils/datagrab";
import { TaxonLevel } from "../utils/constants";
//IMPORT helper functions
import {
  helperGetClassificationLevel,
  helperGetTaxonData,
  helperGetNextAvailableTaxon,
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
    backgroundColor: "#ffffff",
    borderRadius: "5px",
  },
}));

/*
 * PARENT COMPONENT: FilterRows.tsx
 * Props received from parent:
 *   classificationLevel:
 *      The filterTaxon classification... kingdown, phylum etc
 *   dropDownTaxons:
 *      The filterTaxon options corresponding to the classificationLevel
 */
interface FilterProps {
  classificationLevel: TaxonLevel;
  dropDownTaxons: taxonInterface[];
}

/*
 * Main component Function.
 * This component is a basic MUI select
 * It receives an array of taxons for the user to select from
 */
const SearchAll = (props: FilterProps) => {
  //HOOKS here
  let { contextTaxon, setContextTaxon } = useTaxon();
  const [filterTaxon, setFilterTaxon] = useState<taxonInterface | null>(null);
  const classes = useStyles();

  const classificationLevel = props.classificationLevel;

  const contextTaxonData: Record<TaxonLevel, string | undefined | null> = {
    Kingdom: contextTaxon?.kingdom_id,
    Phylum: contextTaxon?.phylum_id,
    Class: contextTaxon?.class_id,
    Order: contextTaxon?.order_id,
    Family: contextTaxon?.family_id,
    Genus: contextTaxon?.genus_id,
    Species: contextTaxon?.species_id,
    "Sub Species": contextTaxon?.sub_species_id,
  };

  /*
   * Receives the new filterTaxon value selected from the drop downs
   * gets called when a filter value changed to a different filterTaxon/null
   */
  const handleTaxonChange = (selectedTaxon: taxonInterface | null) => {
    setFilterTaxon(selectedTaxon);
    //if not clearing search bar.. ie setting selectedTaxon to null
    if (selectedTaxon) {
      setContextTaxon(selectedTaxon);
    }
  };

  //RETURN ELEMENT HERE
  return (
    <Autocomplete
      className={classes.selectBox}
      options={props.dropDownTaxons.filter((t) => t.taxon_name_latin !== null)}
      getOptionLabel={(option) => option.taxon_name_latin || ""}
      value={filterTaxon}
      onChange={(event, newTaxonValue) => handleTaxonChange(newTaxonValue)}
      renderInput={(params) => <TextField {...params} label={"Search All Taxons"} variant="outlined" />}
    />
  );
};

export default SearchAll;
