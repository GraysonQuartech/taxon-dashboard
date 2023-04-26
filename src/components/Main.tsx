/** @format */

// IMPORT React packages and components
import React from "react";
import { useTaxon } from "../contexts/taxonContext";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import TableRegular from "./TableRegular";
import TableCollapse from "./TableCollapse";
// IMPORT MUI packages
// IMPORT Constants + Data + Helper Functions
import { helperGetQuantitativeDataArray, helperGetQualitativeDataArray } from "../utils/helper_functions";
import { columnsQuantitative, columnsQualitative } from "../utils/constants";
import dataSet from "../datasets/taxon_data.json";
import { IqualitativeData, IquantitativeData } from "../utils/datagrab";

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
      <TableRegular<IquantitativeData>
        rows={quantitativeDataArray}
        columns={columnsQuantitative}
        getRowID={(row: IquantitativeData) => row.taxon_measurement_id}
      />
      <TableCollapse<IqualitativeData>
        rows={qualitativeDataArray}
        columns={columnsQualitative}
        getRowID={(row: IqualitativeData) => row.taxon_measurement_id}
      />
    </div>
  );
};

export default Main;
//
//
