/** @format */
//IMPORT React and Child Components
import React, { ReactNode, useEffect } from "react";
import TaxonBubble from "./TaxonBubble";
import ActionCell from "./ActionCell";
import DeleteConfirm from "./DeleteConfirm";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Card, Theme, Typography } from "@mui/material";
import { Collapse } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants + helpers
import { IColumn, IconName } from "../utils/constants";
import EditRow from "./EditRow";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
  },
}));

/*
 *Generic props. table rows and columns
 */
interface CollapsibleRowProps<T> {
  row: T;
  rowID: string;
  columns: IColumn<T>[];
  renderSubTable: (row: T) => ReactNode;
}

const TableRowCollapse = <T extends Record<string, string | number | null>>(props: CollapsibleRowProps<T>) => {
  //HOOKS
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [openEditRow, setOpenEditRow] = React.useState(false);

  const handleIconClick = (iconName: IconName) => {
    console.log("Icon clicked:", iconName);
    // Perform any desired action based on the iconName
    if (iconName === "SubTable") {
      setOpen(!open);
    } else if (iconName === "Delete") {
      setOpenDeleteConfirm(true);
    } else if (iconName === "Edit") {
      setOpenEditRow(true);
    }
  };

  // RETURN ELEMENT
  return openEditRow ? (
    <>
      <EditRow
        key={props.rowID}
        row={props.row}
        columns={props.columns}
        rowID={props.rowID}
        dense={false}
        setOpen={setOpenEditRow}
      />
    </>
  ) : (
    <>
      <TableRow key={props.rowID}>
        {props.columns.map((column, index) => (
          <TableCell key={column.field as string}>
            {column.field === "taxon_id" ? (
              <TaxonBubble taxonID={props.row[column.field as keyof T] as string} />
            ) : (
              props.row[column.field as keyof T]
            )}
          </TableCell>
        ))}
        <TableCell align="right">
          <ActionCell
            Edit={true}
            SubTable={true}
            Check={false}
            Delete={true}
            Cancel={false}
            onIconClick={handleIconClick}
          />
        </TableCell>
      </TableRow>
      <DeleteConfirm open={openDeleteConfirm} setOpen={setOpenDeleteConfirm} rowID={props.rowID} />
      {open && (
        <TableRow>
          <TableCell className={classes.tableCellClass} colSpan={props.columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {props.renderSubTable(props.row)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableRowCollapse;
