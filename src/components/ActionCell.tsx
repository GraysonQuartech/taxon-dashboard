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
import { IconButton, Theme, Tooltip } from "@mui/material";
//IMPORT Constants + Data + Helper Functions
import { IconName } from "../utils/constants";

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  gridContainerClass: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
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
        <Tooltip title="Edit">
          <IconButton className={classes.iconClass} onClick={() => handleIconClick("edit")}>
            <Edit />
          </IconButton>
        </Tooltip>
      )}
      {props.delete && (
        <Tooltip title="Delete">
          <IconButton className={classes.iconClass} onClick={() => handleIconClick("delete")}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
      {props.check && (
        <Tooltip title="Save">
          <IconButton className={classes.iconClass} onClick={() => handleIconClick("check")}>
            <CheckIcon className={classes.checkMarkClass} />
          </IconButton>
        </Tooltip>
      )}
      {props.cancel && (
        <Tooltip title="Cancel">
          <IconButton className={classes.iconClass} onClick={() => handleIconClick("cancel")}>
            <ClearIcon className={classes.cancelClass} />
          </IconButton>
        </Tooltip>
      )}
      {props.subTable && (
        <Tooltip title={arrowDirection ? "Collapse" : "Expand"}>
          <IconButton className={classes.iconClass} onClick={() => handleIconClick("subTable")}>
            {arrowDirection ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default ActionCell;
