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
  helperIsHigherClassificationLevel,
  helperGetTaxonData,
  helperGetLatinNameFromID,
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
const Filter = (props: FilterProps) => {
  //HOOKS here
  let { contextTaxon, setContextTaxon } = useTaxon();
  const [taxon, setTaxon] = useState<taxonInterface | null>(null);
  const classes = useStyles();

  /*
   * This useEffect is triggered when a taxon at any classification level is selected
   * It handles auto value update when a higher or lower taxon is selected
   */
  useEffect(() => {
    //if setting contextTaxon to non null
    if (contextTaxon !== null) {
      if (props.classificationLevel === "Kingdom" && contextTaxon?.kingdom_id) {
        setTaxon(helperGetTaxonData(contextTaxon.kingdom_id));
      } else if (props.classificationLevel === "Phylum" && contextTaxon?.phylum_id) {
        setTaxon(helperGetTaxonData(contextTaxon.phylum_id));
      } else if (props.classificationLevel === "Class" && contextTaxon?.class_id) {
        setTaxon(helperGetTaxonData(contextTaxon.class_id));
      } else if (props.classificationLevel === "Order" && contextTaxon?.order_id) {
        setTaxon(helperGetTaxonData(contextTaxon.order_id));
      } else if (props.classificationLevel === "Family" && contextTaxon?.family_id) {
        setTaxon(helperGetTaxonData(contextTaxon.family_id));
      } else if (props.classificationLevel === "Genus" && contextTaxon?.genus_id) {
        setTaxon(helperGetTaxonData(contextTaxon.genus_id));
      } else if (props.classificationLevel === "Species" && contextTaxon?.species_id) {
        setTaxon(helperGetTaxonData(contextTaxon.species_id));
      } else if (props.classificationLevel === "Sub_Species" && contextTaxon?.sub_species_id) {
        setTaxon(helperGetTaxonData(contextTaxon.sub_species_id));
      } else {
        setTaxon(null);
      }
      //handle contextTaxon level. which will be NULL in the dataset. but have correct taxonID
      if (contextTaxon?.taxon_id && props.classificationLevel === helperGetClassificationLevel(contextTaxon)) {
        setTaxon(contextTaxon);
      }
    }
    //if setting a taxon filter to NULL
    else {
      //update contextTaxon to next classification level up
      //contextTaxon = helperGetNextAvailableTaxon(contextTaxon);
      //only change others to null if lower classification level than the manually changed to null taxon
      setTaxon(null);
    }
  }, [contextTaxon]);

  //RETURN ELEMENT HERE
  return (
    <Autocomplete
      className={classes.selectBox}
      options={props.dropDownTaxons.filter((t) => t.taxon_name_latin !== null)}
      getOptionLabel={(option) => option.taxon_name_latin || ""}
      value={taxon}
      onChange={(event, newTaxonValue) => setContextTaxon(newTaxonValue)}
      renderInput={(params) => <TextField {...params} label={props.classificationLevel} variant="outlined" />}
    />
  );
};

export default Filter;
