/** @format */

//IMPORT REACT packages
import React from "react";
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
 *title props received from main.tsx
 */
interface DisplayProps {
  title: string;
  value: string | undefined;
}

/*
 * Main component Function. displays taxon ID and name
 */
const TaxonDisplay = (props: DisplayProps): JSX.Element => {
  //HOOKS here
  const classes = useStyles();

  //RETURN ELEMENT HERE
  return (
    <div className={classes.gridCellClass}>
      <Typography variant="h6" className={classes.titleClass}>
        {props.title}
      </Typography>
      <Card>
        <CardContent>
          <Typography className={classes.taxonNameClass} component="h2">
            {props.value}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxonDisplay;
