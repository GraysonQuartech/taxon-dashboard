/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { GridColDef } from "@material-ui/data-grid";
import { DataGrid } from "@mui/x-data-grid";
//IMPORT Datasets+Constants
import { IquantitativeData, IquantitativeDataArray, taxonInterface } from "../utils/datagrab";
//IMPORT helper functions

/*
 *PROPS
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
  return <div style={{ height: 400, width: "100%" }}></div>;
};

export default QuantitativeData;
