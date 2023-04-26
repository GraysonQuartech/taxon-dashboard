/** @format */
//IMPORT React and Child Components
import React from "react";
import TableRegular from "./TableRegular";
//IMPORT MUI packages
import { Collapse, Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//IMPORT Datasets+Constants

//TEMP
import { IqualitativeOptionData } from "../utils/datagrab";
import { columnsQualitativeOptions } from "../utils/constants";
import dataSet from "../datasets/taxon_data.json";
import { helperGetQualitativeOptions } from "../utils/helper_functions";

/*
 *Generic props. table rows and columns
 */
interface CollapsibleRowProps<T> {
  row: T;
  rowID: string;
  columns: { headerName: string; field: string }[];
}

const TableRowCollapse = <T extends Record<string, string | number | null>>(props: CollapsibleRowProps<T>) => {
  //TEMP
  //Grabbing qualitative data
  const qualitativeOptionDataArray = helperGetQualitativeOptions(
    props.rowID,
    dataSet.xref_taxon_measurement_qualitative_option
  );

  //HOOKS
  const [open, setOpen] = React.useState(false);

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
          <TableCell key={column.field}> {props.row[column.field as keyof T]} </TableCell>
        ))}
      </TableRow>
      {open && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={props.columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <TableRegular<IqualitativeOptionData>
                rows={qualitativeOptionDataArray}
                columns={columnsQualitativeOptions}
                getRowID={(row: IqualitativeOptionData) => row.qualitative_option_id}
              />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableRowCollapse;
