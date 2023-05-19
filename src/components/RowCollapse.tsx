/** @format */
//IMPORT React and Child Components
import React, { ReactNode } from "react";
import TaxonBubble from "./TaxonBubble";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Button, Card, Theme, Typography } from "@mui/material";
import { Collapse } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//IMPORT Datasets+Constants + helpers
import { IColumn } from "../utils/constants";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
  },
  actionsCardClass: {
    // fontWeight: globalTheme.typography.fontWeightMedium + "!important",
    position: "absolute",
    zIndex: 1,
    color: globalTheme.palette.primary.dark + "!important",
    //padding: globalTheme.spacing(1),
    width: globalTheme.spacing(25),
  },
  actionClass: {
    fontWeight: globalTheme.typography.fontWeightLight + "!important",
    padding: globalTheme.spacing(1),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: globalTheme.palette.primary.main,
      color: globalTheme.palette.common.white,
    },
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

  // RETURN ELEMENT
  return (
    <>
      <TableRow key={props.rowID}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
          <IconButton onClick={() => setOpenActions(!openActions)}>...</IconButton>
          {openActions && (
            <Card className={classes.actionsCardClass}>
              <Typography className={classes.actionClass}>Edit</Typography>
              <Typography className={classes.actionClass}>Delete</Typography>
            </Card>
          )}
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
