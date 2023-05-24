/** @format */
//IMPORT REACT packages
import React, { useState } from "react";
//IMPORT MUI packages
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
//IMPORT helper functions
import { helperGetColorFromID, helperGetLatinNameFromID } from "../utils/helper_functions";

/*
 *taxon id props received from main.tsx
 */
interface TaxonBubbleProps {
  taxonID: string;
}

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  bubbleClass: {
    height: "50%",
    width: "fit-content",
    minWidth: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "40px",
    color: `${globalTheme.palette.primary.contrastText} !important`,
    padding: globalTheme.spacing(1) + "!important",
    paddingLeft: globalTheme.spacing(2) + "!important",
    paddingRight: globalTheme.spacing(2) + "!important",
    margin: "0px",
    fontFamily: globalTheme.typography.fontFamily,
  },
}));

/*
 *Main component. Used to give a coloured bubble around taxon name
 */
const TaxonBubble = (props: TaxonBubbleProps): JSX.Element => {
  const classes = useStyles();
  const [color, setColor] = useState(helperGetColorFromID(props.taxonID));

  return (
    <div className={classes.bubbleClass} style={{ backgroundColor: color }}>
      {helperGetLatinNameFromID(props.taxonID)}
    </div>
  );
};

export default TaxonBubble;
