/** @format */

import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Theme, TextField } from "@mui/material";
import { IColumn } from "../utils/constants";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";

interface IProps<T> {
  columns: IColumn<T>[];
}

const useStyles = makeStyles((globalTheme: Theme) => ({
  cardClass: {
    //backgroundColor: globalTheme.palette.secondary.light,
    width: "100%",
    height: "100%",
    padding: "20px",
    boxSizing: "border-box",
    overflow: "auto",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "8px",
  },
  inputBox: {
    flex: 1,
    maxWidth: "calc(50% - 8px)",
  },
}));

const AddRow = <T,>({ columns }: IProps<T>): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.cardClass}>
      <Card>
        <div className={classes.inputContainer}>
          {columns.map((column, index) => (
            <React.Fragment key={column.field.toString()}>
              {index === 0 && column.field === "taxon_id" ? (
                <Select
                  label={column.headerName}
                  variant="outlined"
                  className={classes.inputBox}
                  defaultValue="Option 1" // Set the defaultValue to the value of the first option
                >
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                  <MenuItem value="Option 3">Option 3</MenuItem>
                </Select>
              ) : (
                <TextField label={column.headerName} variant="outlined" className={classes.inputBox} />
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AddRow;
