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
//IMPORT helper functions

const useStyles = makeStyles((globalTheme: Theme) => ({
  tableClass: {
    width: "100%",
    maxWidth: "50vw",
    maxHeight: "40vh",
    //paddingBottom: globalTheme.spacing(1),
    //paddingTop: globalTheme.spacing(1),
  },
  tableHeaderClass: {
    backgroundColor: globalTheme.palette.secondary.light,
    "& th": {
      fontWeight: globalTheme.typography.fontWeightBold,
    },
  },
}));

/*
 *Generic props. table rows and columns
 */
export interface TableProps<T> {
  tableName: string;
  rows: T[];
  columns: { headerName: string; field: string }[];
  getRowID: (row: T) => string;
}

/*
 * Displays the quantitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const QuantitativeData = <T extends Record<string, string | number | null>>(props: TableProps<T>) => {
  //HOOKS
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <TableContainer component={Paper} className={classes.tableClass}>
      <Typography variant="h6" gutterBottom>
        {props.tableName}
      </Typography>
      <Table size="small">
        <TableHead className={classes.tableHeaderClass}>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
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
  );
};

export default QuantitativeData;
