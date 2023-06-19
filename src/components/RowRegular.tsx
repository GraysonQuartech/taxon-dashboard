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
import { IColumn, IconName, quantativeUnits } from "../utils/constants";
import DeleteConfirm from "./DeleteConfirm";
import { helperGetTaxonParentIDArray } from "../utils/helper_functions";
import { useTaxon } from "../contexts/taxonContext";
import EditRow from "./EditRow";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  cellContainerClass: {
    //width: "100%",
  },
  tableCellClass: {
    display: "flex",
    alignItems: "center",
    // width: "100%",
  },
  tableCellClassDense: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
    // width: "100%",
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
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [openEditRow, setOpenEditRow] = React.useState(false);

  // Perform any desired action based on the iconName
  const handleIconClick = (iconName: IconName) => {
    console.log("Icon clicked:", iconName);
    if (iconName === "Delete") {
      setOpenDeleteConfirm(true);
    }
    if (iconName === "Edit") {
      setOpenEditRow(true);
    }
  };

  //RETURN ELEMENT
  return openEditRow ? (
    <>
      <EditRow
        key={props.rowID}
        row={props.row}
        columns={props.columns}
        rowID={props.rowID}
        dense={props.dense}
        setOpen={setOpenEditRow}
      />
    </>
  ) : (
    <>
      <TableRow key={props.rowID}>
        {props.columns.map((column, index) => (
          <TableCell key={column.field as string} className={classes.cellContainerClass}>
            {column.field === "taxon_id" ? (
              <TaxonBubble taxonID={props.row[column.field as keyof T] as string} />
            ) : (
              <TextField
                size="small"
                value={props.row[column.field as keyof T]}
                multiline
                maxRows={1}
                className={`${props.dense ? classes.tableCellClassDense : classes.tableCellClass}`}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 14,
                    width: column.field === "measurement_desc" || column.field === "option_desc" ? "350px" : "100%",
                  },
                }}
                inputProps={{ readOnly: true, disableUnderline: true }}
              ></TextField>
            )}
          </TableCell>
        ))}
        <TableCell align="right">
          <ActionCell
            Edit={true}
            SubTable={false}
            Check={false}
            Delete={true}
            Cancel={false}
            onIconClick={handleIconClick}
          />
        </TableCell>
      </TableRow>
      <DeleteConfirm open={openDeleteConfirm} setOpen={setOpenDeleteConfirm} rowID={props.rowID} />
    </>
  );
};
export default TableRowRegular;
