/** @format */
//IMPORT React and Child Components
import React, { useEffect, useState } from "react";
import TaxonBubble from "./TaxonBubble";
import ActionCell from "./ActionCell";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { IconButton, MenuItem, Select, TextField, Theme } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants+Helpers
import { IColumn, quantativeUnits } from "../utils/constants";
import { helperGetTaxonParentIDArray } from "../utils/helper_functions";
import { useTaxon } from "../contexts/taxonContext";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({}));

/*
 *Generic props. table rows and columns
 */
export interface EditRowProps<T> {
  row: T;
  rowID: string;
  columns: IColumn<T>[];
  dense: boolean;
  setOpen: (open: boolean) => void;
}

/*
 * A non collapsible regular table row
 * Used by quantitative data component
 */
const EditRow = <T extends Record<string, string | number | null>>(props: EditRowProps<T>) => {
  //HOOKS
  const classes = useStyles();
  const [textFieldValues, setTextFieldValues] = useState<Record<string, string>>({});
  const { contextTaxon } = useTaxon();

  // Perform any desired action based on the iconName
  const handleIconClick = (iconName: string) => {
    console.log("Icon clicked:", iconName);
    if (iconName === "check") {
      console.log("Saved Edit Row");
      props.setOpen(false);
    }
    if (iconName === "cancel") {
      console.log("Cancel Edit Row");
      props.setOpen(false);
    }
  };

  useEffect(() => {
    // Set initial text field values based on props.row
    const initialValues: Record<string, string> = {};
    props.columns.forEach((column) => {
      initialValues[column.field as string] = props.row[column.field as keyof T] as string;
    });
    setTextFieldValues(initialValues);
  }, [props.row, props.columns]);

  const handleTextFieldChange = (field: string, value: string) => {
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  //RETURN ELEMENT
  return (
    <>
      <TableRow key={props.rowID}>
        {props.columns.map((column, index) => (
          <TableCell key={column.field as string}>
            {column.field === "taxon_id" ? (
              <Select size="small" defaultValue={props.row[column.field as keyof T] as string}>
                {helperGetTaxonParentIDArray(contextTaxon).map((taxonID) => (
                  <MenuItem key={taxonID} value={taxonID}>
                    <TaxonBubble taxonID={taxonID} />
                  </MenuItem>
                ))}
              </Select>
            ) : column.field === "unit" ? (
              <Select size="small" defaultValue={Object.values(quantativeUnits)[0]}>
                {Object.values(quantativeUnits).map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <TextField
                size="small"
                placeholder={column.headerName !== null ? column.headerName.toString() : ""}
                value={
                  textFieldValues[column.field as string] !== undefined &&
                  textFieldValues[column.field as string] !== null
                    ? textFieldValues[column.field as string].toString()
                    : ""
                }
                onChange={(e) => handleTextFieldChange(column.field as string, e.target.value)}
              />
            )}
          </TableCell>
        ))}
        <TableCell align="right">
          <ActionCell
            edit={false}
            subTable={false}
            check={true}
            delete={false}
            cancel={true}
            onIconClick={handleIconClick}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default EditRow;
