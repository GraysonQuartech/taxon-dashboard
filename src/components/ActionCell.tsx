/** @format */

//IMPORT React packages and components
import React from "react";
//IMPORT MUI packages
import { Edit, Delete } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, Theme } from "@mui/material";
//IMPORT Constants + Data + Helper Functions
import { IconName } from "../utils/constants";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  gridContainerClass: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns items to the right
    // justifyContent: "flex-start", // Aligns items to the left
  },
  iconClass: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
  },
  checkMarkClass: {
    color: "green",
  },
  cancelClass: {
    color: "red",
  },
}));

interface ActionCellProps {
  edit: boolean;
  delete: boolean;
  check: boolean;
  cancel: boolean;
  subTable: boolean;
  onIconClick: (iconName: IconName) => void;
}

/*
 * Main component Function.
 * This component is a grid of action icons which updates depending on state
 */
const ActionCell = (props: ActionCellProps): JSX.Element => {
  //HOOKS here
  const classes = useStyles();
  const [arrowDirection, setArrowDirection] = React.useState(false);

  //EVENT Handlers here
  const handleIconClick = (iconName: IconName) => {
    if (iconName === "subTable") {
      setArrowDirection(!arrowDirection);
    }
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
          <CheckIcon className={classes.checkMarkClass} />
        </IconButton>
      )}
      {props.cancel && (
        <IconButton className={classes.iconClass} onClick={() => handleIconClick("cancel")}>
          <ClearIcon className={classes.cancelClass} />
        </IconButton>
      )}
      {props.subTable && (
        <IconButton className={classes.iconClass} onClick={() => handleIconClick("subTable")}>
          {arrowDirection === false ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
      )}
    </div>
  );
};

export default ActionCell;
