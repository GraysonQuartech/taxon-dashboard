/** @format */
/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants+Helpers
import { IColumn } from "../utils/constants";
import { helperGetLatinNameFromID } from "../utils/helper_functions";
/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    display: "flex",
    alignItems: "center",
  },
  taxonCellClass: {
    height: "50%",
    width: "fit-content",
    minWidth: "70px",
    backgroundColor: "#9575cd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "70px",
    color: `${globalTheme.palette.primary.contrastText} !important`,
    padding: "6px",
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
      {props.columns.map((column, index) => (
        <TableCell key={column.field as string}>
          <div
            className={`${column.field === "taxon_id" ? classes.taxonCellClass : ""} ${
              props.dense ? classes.tableCellClassDense : classes.tableCellClass
            }`}
          >
            {column.field === "taxon_id"
              ? helperGetLatinNameFromID(props.row[column.field as keyof T] as string)
              : props.row[column.field as keyof T]}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
};
export default TableRowRegular;
