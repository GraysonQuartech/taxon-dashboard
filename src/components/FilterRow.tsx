/** @format */

//IMPORT React packages and components
import React, { useContext } from "react";
import Filter from "./Filter";

//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { Theme } from "@mui/material";
//IMPORT Constants + Data + Helper Functions
import { helperGetTaxonsForClassificationLevel } from "../utils/helper_functions";
import { classificationLevelArray } from "../utils/constants";
import { DataContext } from "../contexts/dataContext";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  gridClass: {
    //backgroundColor: globalTheme.palette.primary.dark,
    padding: globalTheme.spacing(1),
  },
}));

/*
 * Main component Function.
 * This component maps data to MUI select components.
 */
const FilterRow = (): JSX.Element => {
  //HOOKS here
  const dataContext = useContext(DataContext);
  const classes = useStyles();

  //RETURN ELEMENT HERE
  return (
    <Grid container columns={8} spacing={2} className={classes.gridClass}>
      {classificationLevelArray.map((classificationLevel, index) => (
        <Grid item xs={1} key={index}>
          <Filter
            classificationLevel={classificationLevel}
            dropDownTaxons={helperGetTaxonsForClassificationLevel(classificationLevel, dataContext.contextData)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FilterRow;
