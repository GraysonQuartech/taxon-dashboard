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
import {
  helperGetQuantitativeDataArray,
  helperGetQualitativeDataArray,
  helperGetQualitativeOptions,
} from "../utils/helper_functions";
import { columnsQuantitative, columnsQualitative, columnsQualitativeOptions } from "../utils/constants";
import dataSet from "../datasets/taxon_data.json";
import { IqualitativeData, IquantitativeData, IqualitativeOptionData } from "../utils/datagrab";

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
      <div>
        <TaxonDisplay />
        <TableRegular<IquantitativeData>
          tableName={"Quantative Measurements"}
          rows={quantitativeDataArray}
          columns={columnsQuantitative}
          getRowID={(row: IquantitativeData) => row.taxon_measurement_id}
        />
        <TableCollapse<IqualitativeData>
          tableName={"Qualitative Measurements"}
          rows={qualitativeDataArray}
          columns={columnsQualitative}
          getRowID={(row: IqualitativeData) => row.taxon_measurement_id}
          renderSubTable={(row: IqualitativeData) => {
            //Grabbing qualitative data
            const qualitativeOptionDataArray = helperGetQualitativeOptions(
              row.taxon_measurement_id,
              dataSet.xref_taxon_measurement_qualitative_option
            );
            return (
              <TableRegular<IqualitativeOptionData>
                tableName={"Qualitative Options"}
                rows={qualitativeOptionDataArray}
                columns={columnsQualitativeOptions}
                getRowID={(row: IqualitativeOptionData) => row.qualitative_option_id}
              />
            );
          }} // (row: T) => ReactNode;
        />
      </div>
    </div>
  );
};

export default Main;
