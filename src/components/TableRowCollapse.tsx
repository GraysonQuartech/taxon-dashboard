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
import { IqualitativeData } from "../utils/datagrab";

/*
 *Generic props. table rows and columns
 */
export interface CollapsibleRowProps<T> {
  row: T;
  columns: { headerName: string; field: string }[];
}

const TableRowCollapse = <T extends IqualitativeData>(props: CollapsibleRowProps<T>) => {
  //VARIABLES
  const rowId = (row: IqualitativeData): string => row.taxon_measurement_id;

  //HOOKS
  const [open, setOpen] = React.useState(false);

  //RETURN ELEMENT
  return (
    <TableRow key={rowId(props.row)}>
      <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      {props.columns.map((column, index) => (
        <TableCell key={column.field}> {props.row[column.field as keyof IqualitativeData]} </TableCell>
      ))}
    </TableRow>
  );
};
export default TableRowCollapse;
