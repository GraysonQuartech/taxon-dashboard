/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//IMPORT Datasets+Constants
import { IquantitativeData, IquantitativeDataArray, taxonInterface } from "../utils/datagrab";
//IMPORT helper functions

/*
 *Generic props. table rows and columns
 */
export interface MyDataGridProps<T> {
  rows: T[];
  columns: GridColDef[];
}

/*
 * Displays the quantitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const QuantitativeData = <T extends IquantitativeData>(props: MyDataGridProps<T>) => {
  console.log("props.rows", props.rows);
  console.log("props.columns", props.columns);
  //RETURN ELEMENT
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ maxWidth: "50vw", margin: "1rem auto" }}>
        <DataGrid
          rows={props.rows || []}
          columns={props.columns}
          getRowId={(row: IquantitativeData) => row.taxon_measurement_id}
          autoHeight
        />
      </div>
    </div>
  );
};

export default QuantitativeData;
