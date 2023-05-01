/** @format */
/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants+Helpers
import { IColumn } from "../utils/constants";
import { helperGetLatinNameFromID } from "../utils/helper_functions";
/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
    height: "34px",
  },
  tableCellClassDense: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
  },
}));

/*
 *Generic props. table rows and columns
 */
export interface RowProps<T> {
  row: T;
  rowID: string;
  columns: IColumn<T>[];
  dense: boolean;
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
        <TableCell
          className={props.dense ? classes.tableCellClassDense : classes.tableCellClass}
          key={column.field as string}
        >
          {column.field === "taxon_id"
            ? helperGetLatinNameFromID(props.row[column.field as keyof T] as string)
            : props.row[column.field as keyof T]}
        </TableCell>
      ))}
    </TableRow>
  );
};
export default TableRowRegular;
