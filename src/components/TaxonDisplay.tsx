/** @format */

//IMPORT REACT packages
import React from "react";
import { useTaxon } from "../contexts/taxonContext";
//IMPORT MUI packages
import { Card, CardContent, Typography, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  taxonNameClass: {
    color: globalTheme.palette.secondary.main,
  },
  taxonIdClass: {
    color: globalTheme.palette.secondary.main,
  },
  containerClass: {
    paddingBottom: globalTheme.spacing(1),
    paddingTop: globalTheme.spacing(1),
    display: "Inline-Block",
    boxShadow: "none !important",
  },
}));

/*
 * Main component Function. displays taxon ID and name
 */
const TaxonDisplay = (): JSX.Element => {
  //HOOKS here
  const classes = useStyles();
  const { contextTaxon } = useTaxon();

  //RETURN ELEMENT HERE
  return (
    <Card className={classes.containerClass}>
      <CardContent>
        <Typography className={classes.taxonNameClass} variant="h5" component="h2">
          Current Taxon: {contextTaxon?.taxon_name_latin}
        </Typography>
        <Typography className={classes.taxonIdClass} gutterBottom>
          Taxon ID: {contextTaxon?.taxon_id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaxonDisplay;
