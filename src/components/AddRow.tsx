/** @format */
//IMPORT React and Child Components
import React, { useState, useEffect } from "react";
import TaxonBubble from "./TaxonBubble";
import ActionCell from "./ActionCell";
//IMPORT packages
import { makeStyles } from "@mui/styles";
import { Theme, TextField, Select, MenuItem } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
//IMPORT Datasets+Constants
import { IColumn, IconName, quantativeUnits } from "../utils/constants";
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
}));

/*
 *Parent components: table regular and table collapse
 */
interface AddRowProps<T> {
  columns: IColumn<T>[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddRow = <T extends Record<string, string | number | null>>(props: AddRowProps<T>) => {
  const { open, setOpen } = props;

  //Hooks here
  const classes = useStyles();
  const { contextTaxon } = useTaxon();
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  //closes the add row popup when a new taxon is selected
  useEffect(() => {
    setOpen(false);
  }, [contextTaxon]);

  //Event handlers here
  const handleIconClick = (iconName: IconName) => {
    console.log("Icon clicked:", iconName);
    if (iconName === "cancel") {
      setFormValues({});
      setOpen(false);
    }
    if (iconName === "check") {
      const addRowValues: Partial<T> = {};
      let index = 0;
      for (const column of props.columns) {
        addRowValues[column.field as keyof T] = formValues[column.field as string] as T[keyof T];
        index += 1;
      }
      console.log(addRowValues);
      setOpen(false);
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
                defaultValue={helperGetTaxonParentIDArray(contextTaxon).slice(-1)[0]}
                value={formValues[column.field as string] || ""}
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
                defaultValue={Object.values(quantativeUnits)[0]}
                value={formValues[column.field as string] || ""}
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
  ) : null;
};

export default AddRow;
