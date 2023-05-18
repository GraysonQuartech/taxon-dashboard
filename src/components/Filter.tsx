/** @format */
//IMPORT React and Child Components
import React, { useEffect, useState } from "react";
import { useTaxon } from "../contexts/taxonContext";
//IMPORT packages
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { clsx } from "clsx";
//IMPORT Datasets+Constants
import { taxonInterface } from "../utils/datagrab";
import { TaxonLevel } from "../utils/constants";
//IMPORT helper functions
import {
  helperGetClassificationLevel,
  helperGetTaxonData,
  helperGetNextAvailableTaxon,
  helperGetColorFromID,
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
  labelClass: {
    borderRadius: "40px !important",
    padding: globalTheme.spacing(1) + "!important",
    paddingLeft: globalTheme.spacing(2) + "!important",
    paddingRight: globalTheme.spacing(2) + "!important",
  },
}));

/*
 * PARENT COMPONENT: FilterRows.tsx
 * Props received from parent:
 *   classificationLevel:
 *      The filterTaxon classification... kingdown, phylum etc
 *   dropDownTaxons:
 *      The filterTaxon options corresponding to the classificationLevel
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
  const [filterTaxon, setFilterTaxon] = useState<taxonInterface | null>(null);
  //console.log(filterTaxon);
  let classes = useStyles({ filterTaxon });
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
   * This useEffect is triggered when a filterTaxon at any classification level is selected
   * It handles auto value update when a higher or lower filterTaxon is selected
   */
  useEffect(() => {
    if (!classificationLevel) return;

    //if setting contextTaxon to non null
    if (contextTaxon) {
      const tempTaxon = contextTaxonData[classificationLevel];
      if (tempTaxon !== undefined) {
        setFilterTaxon(helperGetTaxonData(tempTaxon));
      }

      //handle contextTaxon level. which will be NULL in the dataset. but have correct taxonID
      if (contextTaxon?.taxon_id && classificationLevel === helperGetClassificationLevel(contextTaxon)) {
        setFilterTaxon(contextTaxon);
      }
    }
    //setting filterTaxon null
    else {
      setFilterTaxon(null);
    }
  }, [contextTaxon]);

  /*
   * Receives the new filterTaxon value selected from the drop downs
   * gets called when a filter value changed to a different filterTaxon/null
   */
  const handleTaxonChange = (selectedTaxon: taxonInterface | null) => {
    //if setting the current filterTaxon to null, the contextTaxon
    //become the next classification level up before its info is reset
    if (selectedTaxon === null && contextTaxon !== null) {
      //set next level up here before info is gone..
      selectedTaxon = helperGetNextAvailableTaxon(contextTaxon, classificationLevel);
    }
    setContextTaxon(selectedTaxon);
  };

  //RETURN ELEMENT HERE
  return (
    <Autocomplete
      className={classes.selectBox}
      options={props.dropDownTaxons.filter((t) => t.taxon_name_latin !== null)}
      getOptionLabel={(option) => option.taxon_name_latin || ""}
      value={filterTaxon}
      onChange={(event, newTaxonValue) => handleTaxonChange(newTaxonValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={classificationLevel}
          variant="outlined"
          //style={{ backgroundColor: "888888 + !important" }} // inline background color
          InputLabelProps={{
            classes: {
              root: classes.labelClass,
            },
            style: {
              backgroundColor: filterTaxon ? helperGetColorFromID(filterTaxon.taxon_id) : "",
              color: filterTaxon ? "white" : "inherit",
              opacity: filterTaxon ? 1 : 0.5,
            },
          }}
        />
      )}
    />
  );
};

export default Filter;
