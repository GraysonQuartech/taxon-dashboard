//IMPORT REACT packages
import React from "react";
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
}));

/*
 * PARENT COMPONENT: App.tsx
 * Props received from parent main.tsx:
 *   taxonName
 *   taxonID
 */
interface TaxonDisplayProps {
  taxonName?: string;
  taxonID?: string;
}

/*
 * Main component Function. displays taxon ID and name
 */
const TaxonDisplay = (props: TaxonDisplayProps): JSX.Element => {
  const { taxonName, taxonID } = props;

  //HOOKS here
  const classes = useStyles();

  //RETURN ELEMENT HERE
  return (
    <Card>
      <CardContent>
        <Typography
          className={classes.taxonNameClass}
          variant="h5"
          component="h2"
        >
          Current Taxon: {taxonName}
        </Typography>
        <Typography className={classes.taxonIdClass} gutterBottom>
          Taxon ID: {taxonID}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaxonDisplay;
