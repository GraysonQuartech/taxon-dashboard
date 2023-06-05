/** @format */
/** @format */
//IMPORT React and Child Components
import React, { useEffect, useState } from "react";
import TaxonBubble from "./TaxonBubble";
import ActionCell from "./ActionCell";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { IconButton, MenuItem, Select, TextField, Theme } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//IMPORT Datasets+Constants+Helpers
import { IColumn, quantativeUnits } from "../utils/constants";
import DeleteConfirm from "./DeleteConfirm";
import { helperGetTaxonParentIDArray } from "../utils/helper_functions";
import { useTaxon } from "../contexts/taxonContext";
import EditRow from "./EditRow";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    display: "flex",
    alignItems: "center",
    minHeight: "34px",
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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState(false);

  // Perform any desired action based on the iconName
  const handleIconClick = (iconName: string) => {
    console.log("Icon clicked:", iconName);
    if (iconName === "delete") {
      setDeleteConfirmOpen(true);
    }
    if (iconName === "edit") {
      setEditRow(true);
    }
  };

  //RETURN ELEMENT
  return editRow ? (
    <>
      <EditRow key={props.rowID} row={props.row} columns={props.columns} rowID={props.rowID} dense={props.dense} />
    </>
  ) : (
    <>
      <TableRow key={props.rowID}>
        {props.columns.map((column, index) => (
          <TableCell key={column.field as string}>
            {column.field === "taxon_id" ? (
              <TaxonBubble taxonID={props.row[column.field as keyof T] as string} />
            ) : (
              <div className={`${props.dense ? classes.tableCellClassDense : classes.tableCellClass}`}>
                {props.row[column.field as keyof T]}
              </div>
            )}
          </TableCell>
        ))}
        <TableCell align="right">
          <ActionCell
            edit={true}
            subTable={false}
            check={false}
            delete={true}
            cancel={false}
            onIconClick={handleIconClick}
          />
        </TableCell>
      </TableRow>
      <DeleteConfirm open={deleteConfirmOpen} setOpen={setDeleteConfirmOpen} rowID={props.rowID} />
    </>
  );
};
export default TableRowRegular;
