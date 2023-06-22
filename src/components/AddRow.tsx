/** @format */
//IMPORT React and Child Components
import React, { useState, useEffect, useContext } from "react";
import TaxonBubble from "./TaxonBubble";
import ActionCell from "./ActionCell";
//IMPORT packages
import { makeStyles } from "@mui/styles";
import { Theme, TextField, Select, MenuItem } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants
import { IColumn, IconName, TableType, quantativeUnits } from "../utils/constants";
import { useTaxon } from "../contexts/taxonContext";
import {
  helperGetCompareFieldValue,
  helperGetTaxonParentIDArray,
  helperVerifyTextField,
} from "../utils/helper_functions";
import { DataContext } from "../contexts/dataContext";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
  },
  selectBoxClass: {
    width: "300px",
  },
}));

/*
 *Parent components: table regular and table collapse
 */
interface AddRowProps<T> {
  columns: IColumn<T>[];
  open: boolean;
  setOpen: (open: boolean) => void;
  tableType: TableType;
  subTableID: string;
}

const AddRow = <T extends Record<string, string | number | null>>(props: AddRowProps<T>) => {
  const { open, setOpen } = props;
  //Hooks here
  const classes = useStyles();
  const { contextTaxon } = useTaxon();
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const dataContext = useContext(DataContext);

  //Called when canceling or adding a row
  const resetAddRow = (): void => {
    setOpen(false);
    setFieldValues(() => ({
      taxon_id: helperGetTaxonParentIDArray(contextTaxon).slice(-1)[0],
      unit: Object.values(quantativeUnits)[0],
    }));
  };

  //closes the add row popup when a new taxon is selected
  //also  reset the taxon ID and unit
  useEffect(() => {
    resetAddRow();
  }, [contextTaxon]);

  //Event handlers here
  const handleIconClick = (iconName: IconName) => {
    console.log("Icon clicked:", iconName);
    if (iconName === "Cancel") {
      resetAddRow();
    }

    if (iconName === "Check") {
      const errorExists = props.columns.some((column) => {
        return (
          helperVerifyTextField(
            fieldValues[column.field as string],
            column.field,
            helperGetCompareFieldValue(column.field, fieldValues)
          ) !== ""
        );
      });
      if (errorExists) {
        alert("Cannot add row with errors!");
        return; // Return early if there is an error
      }

      //if min value left blank when adding a row, just set its value to 0
      const addRowValues = {
        min_value: fieldValues["min_value"] ?? "0",
        ...fieldValues,
      };

      dataContext.addRowContextData(addRowValues, props.tableType, props.subTableID);
      resetAddRow();
    }
  };

  //Called when a text field is changed
  //Updates the field values array with those values
  const handleTextFieldChange = (fieldName: string, value: string) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  //main component
  return open ? (
    <>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell key={column.field as string}>
            {column.field === "taxon_id" ? (
              <Select
                size="small"
                value={fieldValues[column.field as string] || helperGetTaxonParentIDArray(contextTaxon).slice(-1)[0]}
                onChange={(e) => handleTextFieldChange(column.field as string, e.target.value)}
              >
                {helperGetTaxonParentIDArray(contextTaxon).map((taxonID) => (
                  <MenuItem key={taxonID} value={taxonID}>
                    <TaxonBubble taxonID={taxonID} />
                  </MenuItem>
                ))}
              </Select>
            ) : column.field === "unit" ? (
              <Select
                size="small"
                value={fieldValues[column.field as string] || Object.values(quantativeUnits)[0]}
                onChange={(e) => handleTextFieldChange(column.field as string, e.target.value)}
              >
                {Object.values(quantativeUnits).map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <TextField
                className={column.field === "measurement_desc" ? classes.selectBoxClass : ""}
                size="small"
                placeholder={column.headerName.toString()}
                value={fieldValues[column.field as string] || ""}
                onChange={(e) => handleTextFieldChange(column.field as string, e.target.value)}
                error={
                  helperVerifyTextField(
                    fieldValues[column.field as string],
                    column.field,
                    helperGetCompareFieldValue(column.field, fieldValues)
                  ) !== ""
                }
                helperText={helperVerifyTextField(
                  fieldValues[column.field as string],
                  column.field,
                  helperGetCompareFieldValue(column.field, fieldValues)
                )}
              />
            )}
          </TableCell>
        ))}
        <TableCell>
          <ActionCell
            Edit={false}
            SubTable={false}
            Check={true}
            Delete={false}
            Cancel={true}
            onIconClick={handleIconClick}
          />
        </TableCell>
      </TableRow>
    </>
  ) : null;
};

export default AddRow;
