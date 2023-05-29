/** @format */

//IMPORT React packages and components
import React from "react";
//IMPORT MUI packages
import { Edit, Delete } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton, Theme } from "@mui/material";
//IMPORT Constants + Data + Helper Functions

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  gridContainerClass: {
    display: "flex",
    flexDirection: "row",
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

interface ActionCellProps {
  edit: boolean;
  delete: boolean;
  check: boolean;
  cancel: boolean;
  subTable: boolean;
  onIconClick: (iconName: string) => void;
}

/*
 * Main component Function.
 * This component is a grid of action icons which updates depending on state
 */
const ActionCell = (props: ActionCellProps): JSX.Element => {
  //HOOKS here
  const classes = useStyles();

  //EVENT Handlers here
  const handleIconClick = (iconName: string) => {
    props.onIconClick(iconName);
  };

  //RETURN ELEMENT HERE
  return (
    <div className={classes.gridContainerClass}>
      {props.edit && (
        <IconButton className={classes.iconClass} onClick={() => handleIconClick("edit")}>
          <Edit />
        </IconButton>
      )}
      {props.delete && (
        <IconButton className={classes.iconClass} onClick={() => handleIconClick("delete")}>
          <Delete />
        </IconButton>
      )}
      {props.check && (
        <IconButton className={classes.iconClass} onClick={() => handleIconClick("check")}>
          <CheckIcon />
        </IconButton>
      )}
      {props.cancel && (
        <IconButton className={classes.iconClass} onClick={() => handleIconClick("cancel")}>
          <ClearIcon />
        </IconButton>
      )}
      {props.subTable && (
        <IconButton className={classes.iconClass} onClick={() => handleIconClick("subTable")}>
          <KeyboardArrowDownIcon />
        </IconButton>
      )}
    </div>
  );
};

export default ActionCell;
