/** @format */
//IMPORT React and Child Components
import React, { useState } from "react";
import TaxonBubble from "./TaxonBubble";
//IMPORT packages
import { makeStyles } from "@mui/styles";
import { Theme, TextField, Select, MenuItem, IconButton } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
//IMPORT Datasets+Constants
import { IColumn, TaxonLevel, classificationLevelArray } from "../utils/constants";
import { useTaxon } from "../contexts/taxonContext";
import { helperGetTaxonParentIDArray } from "../utils/helper_functions";

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
  checkIconClass: {
    color: "green",
  },
  clearIconClass: {
    color: "red",
  },
}));

/*
 *Parent components: table regular and table collapse
 */
interface CollapsibleRowProps<T> {
  columns: IColumn<T>[];
}

const AddRow = <T extends Record<string, string | number | null>>(props: CollapsibleRowProps<T>) => {
  //Hooks here
  const classes = useStyles();
  const { contextTaxon } = useTaxon();

  return (
    <>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell key={column.field as string}>
            {column.field === "taxon_id" ? (
              <Select size="small" defaultValue={helperGetTaxonParentIDArray(contextTaxon).slice(-1)[0]}>
                {helperGetTaxonParentIDArray(contextTaxon).map((taxonID) => (
                  <MenuItem key={taxonID} value={taxonID}>
                    <TaxonBubble taxonID={taxonID} />
                  </MenuItem>
                ))}
              </Select>
            ) : column.field === "unit" ? (
              <Select size="small" defaultValue="">
                {/* unit dropdown options */}
              </Select>
            ) : (
              <TextField size="small" placeholder={column.headerName.toString()} />
            )}
          </TableCell>
        ))}
        <TableCell>
          <IconButton>
            <CheckIcon className={classes.checkIconClass}></CheckIcon>
          </IconButton>
          <IconButton>
            <ClearIcon className={classes.clearIconClass}></ClearIcon>
          </IconButton>
        </TableCell>
        <div></div>
      </TableRow>
    </>
  );
};

export default AddRow;
