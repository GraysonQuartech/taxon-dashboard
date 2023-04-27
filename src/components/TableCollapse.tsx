/** @format */
//IMPORT React and Child Components
import React, { ReactNode } from "react";
import RowCollapse from "./RowCollapse";
//IMPORT MUI packages
import { Paper, Theme } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
//IMPORT Datasets+Constants
//IMPORT helper functions

const useStyles = makeStyles((globalTheme: Theme) => ({
  tableClass: {
    maxHeight: "50vh",
  },
  titleClass: {
    padding: globalTheme.spacing(1),
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
    <TableContainer component={Paper} className={classes.tableClass}>
      <Typography variant="h6" className={classes.titleClass}>
        {props.tableName}
      </Typography>
      <Table aria-label="collapsible table" size="small">
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
