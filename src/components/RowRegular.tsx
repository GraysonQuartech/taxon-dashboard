/** @format */
/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
//IMPORT Datasets+Constants

/*
 *Generic props. table rows and columns
 */
export interface RowProps<T> {
  row: T;
  rowID: string;
  columns: { headerName: string; field: string }[];
}

/*
 * A non collapsible regular table row
 * Used by quantitative data component
 */
const TableRowRegular = <T extends Record<string, string | number | null>>(props: RowProps<T>) => {
  //RETURN ELEMENT
  return (
    <TableRow key={props.rowID}>
      {props.columns.map((column) => (
        <TableCell key={column.field}> {props.row[column.field as keyof T]} </TableCell>
      ))}
    </TableRow>
  );
};
export default TableRowRegular;
