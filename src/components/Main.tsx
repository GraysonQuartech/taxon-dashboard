/** @format */

// IMPORT React packages and components
import React from "react";
import { useTaxon } from "../contexts/taxonContext";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import QuantitativeData from "./QuantitativeData";
import QualitativeData from "./QualitativeData";
// IMPORT MUI packages
// IMPORT Constants + Data + Helper Functions
import { helperGetQuantitativeDataArray, helperGetQualitativeDataArray } from "../utils/helper_functions";
import { columnsQuantitative, columnsQualitative } from "../utils/constants";
import dataSet from "../datasets/taxon_data.json";

/*
 * Main component function here
 * This component contains all other components
 */
const Main = () => {
  // HOOKS here
  const { contextTaxon } = useTaxon();

  //Grabbing quantitative data
  const quantitativeDataArray = helperGetQuantitativeDataArray(
    contextTaxon?.taxon_id || "",
    dataSet.xref_taxon_measurement_quantitative
  );

  //Grabbing qualitative data
  const qualitativeDataArray = helperGetQualitativeDataArray(
    contextTaxon?.taxon_id || "",
    dataSet.xref_taxon_measurement_qualitative
  );

  // RETURN ELEMENT HERE
  return (
    <div>
      <FilterRow />
      <TaxonDisplay />
      <QuantitativeData rows={quantitativeDataArray} columns={columnsQuantitative} />
      <QualitativeData rows={qualitativeDataArray} columns={columnsQualitative} />
    </div>
  );
};

export default Main;
//
//
