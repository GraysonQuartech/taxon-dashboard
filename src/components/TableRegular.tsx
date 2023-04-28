/** @format */
//IMPORT React and Child Components
import React from "react";
import RowRegular from "./RowRegular";
//IMPORT MUI packages
import { Paper, Theme } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
//IMPORT Datasets+Constants
import { IColumn } from "../utils/constants";
//IMPORT helper functions

const useStyles = makeStyles((globalTheme: Theme) => ({
  tableClass: {
    height: "65vh",
    maxHeight: "65vh",
    width: "100%",
  },
  tableHeaderClass: {
    backgroundColor: globalTheme.palette.secondary.light,
    "& th": {
      fontWeight: globalTheme.typography.fontWeightMedium,
    },
  },
  titleClass: {
    padding: globalTheme.spacing(1),
    color: globalTheme.palette.secondary.dark,
  },
}));

/*
 *Generic props. table rows and columns
 */
export interface TableProps<T> {
  tableName: string;
  rows: T[];
  columns: IColumn<T>[];
  getRowID: (row: T) => string;
}

/*
 * Displays the quantitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const RegularTable = <T extends Record<string, string | number | null>>(props: TableProps<T>) => {
  //HOOKS
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <div>
      <Typography variant="h6" className={classes.titleClass}>
        {props.tableName}
      </Typography>
      <TableContainer component={Paper} className={classes.tableClass}>
        <Table size="small" stickyHeader>
          <TableHead className={classes.tableHeaderClass}>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell key={column.field as string}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <RowRegular row={row} columns={props.columns} rowID={props.getRowID(row)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RegularTable;
