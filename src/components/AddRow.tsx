/** @format */

//IMPORT React packages and components
import React from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Card, Theme } from "@mui/material";
//IMPORT Constants + Data + Helper Functions

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  cardClass: {
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
  },
}));

/*
 * Main component Function.
 * This component maps data to MUI select components.
 */
const AddRow = (): JSX.Element => {
  //HOOKS here
  const classes = useStyles();

  //RETURN ELEMENT HERE
  return (
    <div className={classes.cardClass}>
      <Card></Card>
    </div>
  );
};

export default AddRow;
