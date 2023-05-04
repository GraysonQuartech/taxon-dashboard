/** @format */

//IMPORT REACT packages
import React from "react";
//IMPORT MUI packages
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
//IMPORT HELPER FUNCTIONS
import { helperGetLatinNameFromID } from "../utils/helper_functions";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  bubbleClass: {
    height: "50%",
    width: "fit-content",
    minWidth: "70px",
    backgroundColor: "#9575cd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "70px",
    color: `${globalTheme.palette.primary.contrastText} !important`,
    padding: "6px",
  },
}));

/*
 *title props received from main.tsx
 */
interface TaxonBubbleProps {
  taxonID: string;
}

/*
 * Main component Function. displays taxon ID and name
 */
const TaxonBubble = (props: TaxonBubbleProps): JSX.Element => {
  //HOOKS here
  const classes = useStyles();

  //RETURN ELEMENT HERE
  return <div className={classes.bubbleClass}>{helperGetLatinNameFromID(props.taxonID)}</div>;
};

export default TaxonBubble;
