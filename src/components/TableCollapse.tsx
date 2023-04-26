/** @format */
//IMPORT React and Child Components
import React, { ReactNode } from "react";
import RowCollapse from "./RowCollapse";
//IMPORT MUI packages
import { Theme } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
//IMPORT Datasets+Constants
//IMPORT helper functions

const useStyles = makeStyles((globalTheme: Theme) => ({
  tableClass: {
    width: "100%",
    maxWidth: "100vw",
    maxHeight: "50vh",
    paddingBottom: globalTheme.spacing(1),
    paddingTop: globalTheme.spacing(1),
  },
  tableHeaderClass: {
    paddingBottom: globalTheme.spacing(1),
    paddingTop: globalTheme.spacing(1),
    backgroundColor: globalTheme.palette.secondary.light,
  },
}));

/*
 *Generic props. table rows and columns
 */
export interface TableProps<T> {
  rows: T[];
  columns: { headerName: string; field: string }[];
  getRowID: (row: T) => string;
  renderSubTable: (row: T) => ReactNode; //
}

/*
 * Displays the qualitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const QualitativeData = <T extends Record<string, string | number | null>>(props: TableProps<T>) => {
  //HOOKS
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <TableContainer className={classes.tableClass}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHeaderClass}>
            <TableCell></TableCell>
            {props.columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <RowCollapse
              row={row}
              columns={props.columns}
              rowID={props.getRowID(row)}
              renderSubTable={props.renderSubTable}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QualitativeData;
