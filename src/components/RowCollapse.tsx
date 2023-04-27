/** @format */
//IMPORT React and Child Components
import React, { ReactNode } from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { Collapse, Box } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//IMPORT Datasets+Constants
import { IColumn } from "../utils/constants";
/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
  },
}));

/*
 *Generic props. table rows and columns
 */
interface CollapsibleRowProps<T> {
  row: T;
  rowID: string;
  columns: IColumn<T>[];
  renderSubTable: (row: T) => ReactNode;
}

const TableRowCollapse = <T extends Record<string, string | number | null>>(props: CollapsibleRowProps<T>) => {
  //HOOKS
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <>
      <TableRow key={props.rowID}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {props.columns.map((column, index) => (
          <TableCell key={column.field as string}> {props.row[column.field as keyof T]} </TableCell>
        ))}
      </TableRow>
      {open && (
        <TableRow>
          <TableCell className={classes.tableCellClass} colSpan={props.columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {props.renderSubTable(props.row)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableRowCollapse;
