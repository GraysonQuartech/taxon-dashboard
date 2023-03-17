//IMPORT REACT packages
import React from "react";
//IMPORT MUI packages
import { Card, CardContent, Typography } from "@mui/material";

/*
 * PARENT COMPONENT: App.tsx
 * Props received from parent:
 *   currentTaxon:
 */
interface TaxonDisplayProps {
  currentTaxon: string;
  taxonID: number;
}

/*
 * Main component Function.
 */
const TaxonDisplay = (props: TaxonDisplayProps): JSX.Element => {
  const { currentTaxon, taxonID } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Current Taxon: {currentTaxon}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Taxon ID: {taxonID}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaxonDisplay;
