/** @format */
/** @format */
//IMPORT React and Child Components
import React, { useEffect } from "react";
import TaxonBubble from "./TaxonBubble";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { IconButton, Theme } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//IMPORT Datasets+Constants+Helpers
import { IColumn } from "../utils/constants";
import RowActions from "./RowActions";

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
  iconClass: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
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
  const [openActions, setOpenActions] = React.useState(false);

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

  //RETURN ELEMENT
  return (
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
      <TableCell>
        <IconButton className={classes.iconClass} onClick={() => setOpenActions(!openActions)}>
          <MoreHorizIcon />
        </IconButton>
        {openActions && <RowActions rowID={props.rowID} />}
      </TableCell>
    </TableRow>
  );
};
export default TableRowRegular;
