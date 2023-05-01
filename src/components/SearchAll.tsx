/** @format */

import React, { useState } from "react";
import { useTaxon } from "../contexts/taxonContext";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { taxonInterface } from "../utils/datagrab";
import { classificationLevelArray } from "../utils/constants";
import { helperGetClassificationLevel } from "../utils/helper_functions";

const useStyles = makeStyles((globalTheme: Theme) => ({
  formControl: {
    width: "100%",
  },
  selectBox: {
    backgroundColor: "#ffffff",
    borderRadius: "5px",
  },
}));

interface FilterProps {
  dropDownTaxons: taxonInterface[];
}

const SearchAll = (props: FilterProps) => {
  let { contextTaxon, setContextTaxon } = useTaxon();
  const [filterTaxon, setFilterTaxon] = useState<taxonInterface | null>(null);
  const classes = useStyles();

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

  const handleTaxonChange = (selectedTaxon: taxonInterface | null) => {
    setFilterTaxon(selectedTaxon);
    if (selectedTaxon) {
      setContextTaxon(selectedTaxon);
    }
  };

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
