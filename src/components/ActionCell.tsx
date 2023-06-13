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
  Edit: boolean;
  Delete: boolean;
  Check: boolean;
  Cancel: boolean;
  SubTable: boolean;
  onIconClick: (iconName: IconName) => void;
}

/*
 * Main component Function.
 * This component is a grid of action icons which updates depending on state
 */
const ActionCell = (props: ActionCellProps): JSX.Element => {
  const classes = useStyles();
  const [arrowDirection, setArrowDirection] = React.useState(false);

  //EVENT Handlers here
  const handleIconClick = (iconName: IconName) => {
    if (iconName === "SubTable") {
      setArrowDirection(!arrowDirection);
    }
    props.onIconClick(iconName);
  };

  // Load props except for onIconClick into an array
  const actionProps = [
    { name: "Edit" as IconName, icon: <Edit />, title: "Edit" },
    { name: "Delete" as IconName, icon: <Delete />, title: "Delete" },
    { name: "Check" as IconName, icon: <CheckIcon className={classes.checkMarkClass} />, title: "Save" },
    { name: "Cancel" as IconName, icon: <ClearIcon className={classes.cancelClass} />, title: "Cancel" },
    {
      name: "SubTable" as IconName,
      icon: arrowDirection ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />,
      title: arrowDirection ? "Collapse" : "Expand",
    },
  ];
  //RETURN ELEMENT HERE
  return (
    <div className={classes.gridContainerClass}>
      {actionProps.map((actionProp) => {
        if (props[actionProp.name]) {
          return (
            <Tooltip key={actionProp.name} title={actionProp.title}>
              <IconButton className={classes.iconClass} onClick={() => handleIconClick(actionProp.name)}>
                {actionProp.icon}
              </IconButton>
            </Tooltip>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ActionCell;
