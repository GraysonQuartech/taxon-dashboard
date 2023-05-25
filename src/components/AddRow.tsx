/** @format */
//IMPORT React and Child Components
import React, { useState } from "react";
//IMPORT packages
import { makeStyles } from "@mui/styles";
import { Theme, TextField } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants
import { IColumn } from "../utils/constants";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
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
 *Parent components: table regular and table collapse
 */
interface CollapsibleRowProps<T> {
  columns: IColumn<T>[];
}

const AddRow = <T extends Record<string, string | number | null>>(props: CollapsibleRowProps<T>) => {
  const classes = useStyles();

  return (
    <>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell>
            <TextField />
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </>
  );
};

export default AddRow;
