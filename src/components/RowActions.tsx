/** @format */
//IMPORT React and Child Components
import React, { ReactNode, useState } from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Card, Theme, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
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

  showDeleteConfirmation: {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
  const classes = useStyles();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Card className={classes.actionsCardClass}>
        <div className={classes.actionClass}>
          <Edit className={classes.iconClass} />
          <Typography> Edit</Typography>
        </div>
        <div className={classes.actionClass} onClick={handleDeleteClick}>
          <Delete className={classes.iconClass} />
          <Typography> Delete</Typography>
        </div>
      </Card>
      {showDeleteConfirmation && (
        <>
          <Card className={classes.showDeleteConfirmation}>
            <Typography>Are you sure you want to delete this row?</Typography>
            <div>
              <button onClick={handleCancelDelete}>Cancel</button>
              <button>Delete</button>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default RowActions;
