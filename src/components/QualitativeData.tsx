/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
//IMPORT Datasets+Constants
import { IqualitativeData } from "../utils/datagrab";
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
  columns: GridColDef[];
}

/*
 * Displays the qualitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const QualitativeData = <T extends IqualitativeData>(props: MyDataGridProps<T>) => {
  //HOOKS
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <div className={classes.root}>
      <DataGrid
        rows={props.rows || []}
        columns={props.columns}
        getRowId={(row: IqualitativeData) => row.taxon_measurement_id}
        autoHeight
      />
    </div>
  );
};

export default QualitativeData;
