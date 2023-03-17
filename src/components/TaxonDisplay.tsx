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
}

/*
 * Main component Function.
 */
const TaxonDisplay = (props: TaxonDisplayProps): JSX.Element => {
  return <div>{props.currentTaxon}</div>;
};

export default TaxonDisplay;
