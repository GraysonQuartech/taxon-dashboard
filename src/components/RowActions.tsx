/** @format */
//IMPORT React and Child Components
import React, { ReactNode } from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Card, Theme, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
//IMPORT Datasets+Constants + helpers

/*
 * STYLE definitions for useStyles hook
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  actionsCardClass: {
    position: "absolute",
    zIndex: 1,
    color: globalTheme.palette.primary.dark + "!important",
    display: "flex",
    flexDirection: "column",
  },
  actionClass: {
    fontWeight: globalTheme.typography.fontWeightLight + "!important",
    padding: globalTheme.spacing(1),
    paddingLeft: globalTheme.spacing(2),
    paddingRight: globalTheme.spacing(2),
    display: "flex",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: globalTheme.palette.primary.main,
      color: globalTheme.palette.common.white,
    },
  },
  iconClass: {
    color: globalTheme.palette.secondary.dark + "!important",
    paddingRight: globalTheme.spacing(1),
  },
}));

/*
 *Generic props. table rows and columns
 */
interface RowActionsProps {
  rowID: string;
}

/*
 *This component is the popup list of actions for a table row
 */
const RowActions = (props: RowActionsProps) => {
  //HOOKS
  const classes = useStyles();

  // RETURN ELEMENT
  return (
    <Card className={classes.actionsCardClass}>
      <div className={classes.actionClass}>
        <Edit className={classes.iconClass} />
        <Typography> Edit</Typography>
      </div>
      <div className={classes.actionClass}>
        <Delete className={classes.iconClass} />
        <Typography> Delete</Typography>
      </div>
    </Card>
  );
};

export default RowActions;
