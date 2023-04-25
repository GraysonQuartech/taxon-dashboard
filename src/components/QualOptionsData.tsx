/** @format */
//IMPORT React and Child Components
import React from "react";
//IMPORT MUI packages
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
//IMPORT Datasets+Constants + helpers
import { IqualitativeOptionData } from "../utils/datagrab";

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
 * Displays the qualitative options data table
 * Associated to the current context taxon and the selected qualitative measurement
 * displaying:
 *      option_label, option_value, option_desc
 */
const QualOptionsData = <T extends IqualitativeOptionData>(props: MyDataGridProps<T>) => {
  //HOOKS
  const classes = useStyles();

  //RETURN ELEMENT
  return (
    <div className={classes.root}>
      <DataGrid
        columns={props.columns}
        rows={props.rows || []}
        getRowId={(row: IqualitativeOptionData) => row.qualitative_option_id}
        rowThreshold={0}
        autoHeight
      />
    </div>
  );
};

export default QualOptionsData;
