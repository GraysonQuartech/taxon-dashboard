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
import { IColumn } from "../utils/constants";

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
  const [openActions, setOpenActions] = React.useState(false);
  const classes = useStyles();
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = React.useState(false);

  //Effect to close the actionsCardClass when openActions becomes false
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenActions(false);
    };
    if (openActions) {
      //document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openActions]);

  const handleIconClick = (iconName: string) => {
    console.log("Icon clicked:", iconName);
    // Perform any desired action based on the iconName
    if (iconName === "subTable") {
      setOpen(!open);
    } else if (iconName === "delete") {
      setDisplayDeleteConfirmation(true);
    }
  };

  // RETURN ELEMENT
  return (
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
        <TableCell>
          <ActionCell
            edit={true}
            subTable={true}
            check={false}
            delete={true}
            cancel={false}
            onIconClick={handleIconClick}
          />
        </TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell className={classes.tableCellClass} colSpan={props.columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {props.renderSubTable(props.row)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
      {displayDeleteConfirmation && <DeleteConfirm rowID={props.rowID} />}
    </>
  );
};

export default TableRowCollapse;
