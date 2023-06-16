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
import { helperGetTaxonParentIDArray } from "../utils/helper_functions";
import { DataContext } from "../contexts/dataContext";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  tableCellClass: {
    fontWeight: globalTheme.typography.fontWeightMedium + "!important",
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
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const dataContext = useContext(DataContext);

  //closes the add row popup when a new taxon is selected
  useEffect(() => {
    setOpen(false);
    setFormValues((prevValues) => ({
      ...prevValues,
      taxon_id: helperGetTaxonParentIDArray(contextTaxon).slice(-1)[0],
      unit: Object.values(quantativeUnits)[0],
    }));
  }, [contextTaxon, quantativeUnits]);

  //Event handlers here
  const handleIconClick = (iconName: IconName) => {
    console.log("Icon clicked:", iconName);
    if (iconName === "Cancel") {
      setFormValues({});
      setOpen(false);
    }

    if (iconName === "Check") {
      const addRowValues: Partial<T> = {};
      let index = 0;
      for (const column of props.columns) {
        addRowValues[column.field as keyof T] = formValues[column.field as string] as T[keyof T];
        index += 1;
      }

      dataContext.addRowContextData(addRowValues, props.tableType, props.subTableID);

      setOpen(false);
      setFormValues({});
      setFormValues((prevValues) => ({
        ...prevValues,
        taxon_id: helperGetTaxonParentIDArray(contextTaxon).slice(-1)[0],
        unit: Object.values(quantativeUnits)[0],
      }));
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  /*
   * This function is called by the input text fields and handles whether
   * or not they throw an error based on the input
   */
  const verifyTextField = (fieldVal: string, columnType: string | number | symbol): boolean => {
    if (columnType === "measurement_name" && fieldVal === "") {
      return true;
    } else if (columnType === "min_value" && (fieldVal as unknown as number) < 0) {
      return true;
    } else if (columnType === "max_value" && (fieldVal as unknown as number) < 0) {
      return true;
    } else if (columnType === "option_label" && fieldVal === "") {
      return true;
    } else if (columnType === "option_value" && (fieldVal as unknown as number) < 0) {
      return true;
    }

    return false;
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
                value={formValues[column.field as string] || helperGetTaxonParentIDArray(contextTaxon).slice(-1)[0]}
                onChange={(e) => handleChange(column.field as string, e.target.value)}
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
                value={formValues[column.field as string] || Object.values(quantativeUnits)[0]}
                onChange={(e) => handleChange(column.field as string, e.target.value)}
              >
                {Object.values(quantativeUnits).map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <TextField
                //helperText="Incorrect entry."
                size="small"
                placeholder={column.headerName.toString()}
                value={formValues[column.field as string] || ""}
                onChange={(e) => handleChange(column.field as string, e.target.value)}
                error={verifyTextField(formValues[column.field as string], column.field)}
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
