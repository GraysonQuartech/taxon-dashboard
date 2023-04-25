/** @format */
//IMPORT React and Child Components
import React from "react";
import CollapsibleRow from "./CollapsibleRow";
//IMPORT MUI packages
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
//IMPORT Datasets+Constants
import dataSet from "../datasets/taxon_data.json";
import { IqualitativeData, IqualitativeOptionData } from "../utils/datagrab";
import { helperGetQualitativeOptions } from "../utils/helper_functions";
import { columnsQualitativeOptions } from "../utils/constants";

//IMPORT helper functions

const useStyles = makeStyles({
  root: {
    height: 400,
    width: "100%",
    maxWidth: "75vw",
    //margin: "1rem auto",
  },
});

/*
 *Generic props. table rows and columns
 */
export interface MyDataGridProps<T> {
  rows: T[];
  columns: { headerName: string; field: string }[];
}

/*
 * Accepts a measurement ID and returns the options table component
 * associated to it
 */
//const OptionsTableConent = (measurementId: string) => {
//  return (
//<QualOptionsData
//  rows={helperGetQualitativeOptions(measurementId, dataSet.xref_taxon_measurement_qualitative_option)}
//  columns={columnsQualitativeOptions}
///>
//  );
//};

/*
 * Displays the qualitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const QualitativeData = <T extends IqualitativeData>(props: MyDataGridProps<T>) => {
  //HOOKS
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <TableContainer className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <CollapsibleRow row={row} columns={props.columns} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QualitativeData;
