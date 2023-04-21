/** @format */

// IMPORT React packages and components
// import React from "react";
import { useTaxon } from "../contexts/taxonContext";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import QuantitativeData, { MyDataGridProps } from "./QuantitativeData";
// IMPORT MUI packages
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// IMPORT Constants + Data + Helper Functions
import { helperGetQuantitativeDataArray } from "../utils/helper_functions";
import { IquantitativeData } from "../utils/datagrab";
import dataSet from "../datasets/taxon_data.json";

/*
 * Main component function here
 * This component contains all other components
 */
const Main = () => {
  // HOOKS here
  const { contextTaxon } = useTaxon();

  const quantitativeDataArray = helperGetQuantitativeDataArray(
    contextTaxon?.taxon_id || "",
    dataSet.xref_taxon_measurement_quantitative
  );

  const columns: GridColDef<IquantitativeData>[] = [
    { field: "measurement_name", headerName: "Name", flex: 1 },
    { field: "measurement_desc", headerName: "Description", flex: 1 },
    { field: "min_value", headerName: "Min Value", flex: 1 },
    { field: "max_value", headerName: "Max Value", flex: 1 },
    { field: "unit", headerName: "Unit", flex: 1 },
  ];

  console.log("quantitativeDataArray", quantitativeDataArray);
  console.log("columns", columns);

  // RETURN ELEMENT HERE
  return (
    <div>
      <TaxonDisplay />
      <FilterRow />
      <div style={{ maxWidth: "50vw", margin: "1rem auto" }}>
        <DataGrid
          rows={quantitativeDataArray || []}
          columns={columns}
          checkboxSelection
          getRowId={(row: IquantitativeData) => row.taxon_measurement_id}
          autoHeight
        />
      </div>
    </div>
  );
};

export default Main;
//
//
