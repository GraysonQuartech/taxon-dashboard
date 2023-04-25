/** @format */
/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//IMPORT Datasets+Constants
import dataSet from "../datasets/taxon_data.json";
import { IquantitativeData, IqualitativeOptionData } from "../utils/datagrab";
import { helperGetQualitativeOptions } from "../utils/helper_functions";
import { columnsQualitativeOptions } from "../utils/constants";

/*
 *Generic props. table rows and columns
 */
export interface TableRowProps<T> {
  row: T;
  columns: { headerName: string; field: string }[];
}

/*
 * A non collapsible regular table row
 * Used by quantitative data component
 */
const TableRowRegular = <T extends IquantitativeData>(props: TableRowProps<T>) => {
  //VARIABLES
  const rowId = (row: IquantitativeData): string => row.taxon_measurement_id;

  //RETURN ELEMENT
  return (
    <TableRow key={rowId(props.row)}>
      {props.columns.map((column, index) => (
        <TableCell key={column.field}> {props.row[column.field as keyof IquantitativeData]} </TableCell>
      ))}
    </TableRow>
  );
};
export default TableRowRegular;
