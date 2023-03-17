//IMPORT REACT packages
import React from "react";
//IMPORT MUI packages

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
  return (
    <div>
      <p>Current Taxon: {props.currentTaxon}</p>
      <p>Taxon ID: {props.taxonID}</p>
    </div>
  );
};

export default TaxonDisplay;
