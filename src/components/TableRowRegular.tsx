/** @format */
/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
//IMPORT Datasets+Constants
import { IquantitativeData } from "../utils/datagrab";

/*
 *Generic props. table rows and columns
 */
export interface TableRowProps<T> {
  row: T;
  rowID: string;
  columns: { headerName: string; field: string }[];
}

/*
 * A non collapsible regular table row
 * Used by quantitative data component
 */
const TableRowRegular = <T extends Record<string, string | number | null>>(props: TableRowProps<T>) => {
  //VARIABLES
  //const rowId = (row: IquantitativeData): string => row.taxon_measurement_id;

  //RETURN ELEMENT
  return (
    <TableRow key={props.rowID}>
      {props.columns.map((column, index) => (
        <TableCell key={column.field}> {props.row[column.field as keyof IquantitativeData]} </TableCell>
      ))}
    </TableRow>
  );
};
export default TableRowRegular;
