/** @format */

//IMPORT REACT packages
import React from "react";
import { useTaxon } from "../contexts/taxonContext";
//IMPORT MUI packages
import { Card, CardContent, Typography, Theme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  titleClass: {
    color: globalTheme.palette.secondary.dark,
  },
  taxonNameClass: {
    color: globalTheme.palette.primary.light,
  },
  taxonIdClass: {
    color: globalTheme.palette.primary.light,
  },
  gridClass: {
    boxShadow: "none !important",
    gridTemplateColumns: "auto auto",
    justifyContent: "left",
    display: "grid",
    width: "70%",
    gridGap: globalTheme.spacing(6),
  },
  gridCellClass: {
    width: "100%",
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
    <Grid className={classes.gridClass}>
      <div className={classes.gridCellClass}>
        <Typography variant="h6" className={classes.titleClass}>
          Current Taxon
        </Typography>
        <Card>
          <CardContent>
            <Typography className={classes.taxonNameClass} component="h2">
              {contextTaxon?.taxon_name_latin}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className={classes.gridCellClass}>
        <Typography variant="h6" className={classes.titleClass}>
          Taxon ID
        </Typography>
        <Card>
          <CardContent>
            <Typography className={classes.taxonIdClass} component="h2">
              {contextTaxon?.taxon_id}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};

export default TaxonDisplay;
