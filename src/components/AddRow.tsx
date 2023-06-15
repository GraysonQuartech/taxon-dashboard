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
    const measurementName = formValues["measurement_name"];
    const optionLabel = formValues["option_label"];
    const minValue = Number(formValues["min_value"]) || 0;
    const maxValue = Number(formValues["max_value"]) || 0;

    if (iconName === "Check") {
      if (measurementName || optionLabel) {
        if (minValue >= 0) {
          if (maxValue >= minValue) {
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
          } else {
            alert("Min value must be less than or equal to Max value");
          }
        } else {
          alert("Min value must be greater than or equal to 0.");
        }
      } else {
        alert("Cannot add row with missing fields.");
      }
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormValues((prevValues) => ({
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
                size="small"
                placeholder={column.headerName.toString()}
                value={formValues[column.field as string] || ""}
                onChange={(e) => handleChange(column.field as string, e.target.value)}
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
