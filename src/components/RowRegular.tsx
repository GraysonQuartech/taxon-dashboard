/** @format */
/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
    height: "34px",
  },
}));

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
  //HOOKS
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <TableRow key={props.rowID}>
      {props.columns.map((column) => (
        <TableCell className={classes.tableCellClass} key={column.field}>
          {" "}
          {props.row[column.field as keyof T]}{" "}
        </TableCell>
      ))}
    </TableRow>
  );
};
export default TableRowRegular;
