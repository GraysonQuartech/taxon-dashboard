/** @format */
//IMPORT React and Child Components
import React, { ReactNode, useEffect } from "react";
import TaxonBubble from "./TaxonBubble";
import RowActions from "./RowActions";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Card, Theme, Typography } from "@mui/material";
import { Collapse } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//IMPORT Datasets+Constants + helpers
import { IColumn } from "../utils/constants";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
  },
  iconClass: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px", // Adjust the width to your desired value
    height: "34px", // Adjust the height to your desired value
    borderRadius: "50%", // Makes the IconButton a circle
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

  // Effect to close the actionsCardClass when openActions becomes false
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
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton className={classes.iconClass} onClick={() => setOpenActions(!openActions)}>
            <MoreHorizIcon />
          </IconButton>
          {openActions && <RowActions rowID={props.rowID} />}
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
    </>
  );
};

export default TableRowCollapse;
