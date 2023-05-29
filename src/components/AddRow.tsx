/** @format */
//IMPORT React and Child Components
import React, { useState } from "react";
import TaxonBubble from "./TaxonBubble";
import ActionCell from "./ActionCell";
//IMPORT packages
import { makeStyles } from "@mui/styles";
import { Theme, TextField, Select, MenuItem } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants
import { IColumn } from "../utils/constants";
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

  //Event handlers here
  const handleIconClick = (iconName: string) => {
    console.log("Icon clicked:", iconName);
    // Perform any desired action based on the iconName
  };

  //main component
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
          <ActionCell
            edit={false}
            subTable={false}
            check={true}
            delete={false}
            cancel={true}
            onIconClick={handleIconClick}
          />
        </TableCell>
        <div></div>
      </TableRow>
    </>
  );
};

export default AddRow;
