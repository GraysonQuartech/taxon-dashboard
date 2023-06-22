/** @format */
//IMPORT React and Child Components
import React, { useContext, useEffect, useState } from "react";
import TaxonBubble from "./TaxonBubble";
import ActionCell from "./ActionCell";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { MenuItem, Select, TextField, Theme } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants+Helpers
import { IColumn, IconName, quantativeUnits } from "../utils/constants";
import {
  helperGetCompareFieldValue,
  helperGetTaxonParentIDArray,
  helperVerifyTextField,
} from "../utils/helper_functions";
import { useTaxon } from "../contexts/taxonContext";
import { DataContext } from "../contexts/dataContext";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  selectBoxClass: {
    width: "300px",
  },
}));

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
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const { contextTaxon } = useTaxon();
  const dataContext = useContext(DataContext);

  useEffect(() => {
    // Set initial text field values based on props.row
    const initialValues: Record<string, string> = {};
    props.columns.forEach((column) => {
      initialValues[column.field as string] = props.row[column.field as keyof T] as string;
    });
    setFieldValues(initialValues);
  }, [props.row, props.columns]);

  // Perform any desired action based on the iconName
  const handleIconClick = (iconName: IconName) => {
    console.log("Icon clicked:", iconName);
    if (iconName === "Cancel") {
      console.log("Cancel Edit Row");
      props.setOpen(false);
    }

    if (iconName === "Check") {
      const editRowValues = { ...props.row, ...fieldValues };

      const errorExists = props.columns.some((column) => {
        return (
          helperVerifyTextField(
            String(editRowValues[column.field as string]),
            column.field,
            helperGetCompareFieldValue(column.field, editRowValues)
          ) !== ""
        );
      });
      if (errorExists) {
        alert("Cannot save row with errors!");
        return; // Return early if there is an error
      }

      dataContext.editRowContextData(props.rowID, editRowValues);
      props.setOpen(false);
    }
  };

  const handleTextFieldChange = (field: string, value: string) => {
    setFieldValues((prevValues) => ({
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
              <Select
                size="small"
                defaultValue={props.row[column.field as keyof T] as string}
                onChange={(e) => handleTextFieldChange(column.field as string, e.target.value as string)}
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
                defaultValue={String(props.row[column.field as keyof T])}
                onChange={(e) => handleTextFieldChange(column.field as string, String(e.target.value))}
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
                placeholder={column.headerName !== null ? column.headerName.toString() : ""}
                value={fieldValues[column.field as string]}
                onChange={(e) => handleTextFieldChange(column.field as string, e.target.value)}
                error={
                  helperVerifyTextField(
                    String(fieldValues[column.field as string]),
                    column.field,
                    helperGetCompareFieldValue(column.field, fieldValues)
                  ) !== ""
                }
                helperText={helperVerifyTextField(
                  String(fieldValues[column.field as string]),
                  column.field,
                  helperGetCompareFieldValue(column.field, fieldValues)
                )}
              />
            )}
          </TableCell>
        ))}
        <TableCell align="right">
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
  );
};

export default EditRow;
