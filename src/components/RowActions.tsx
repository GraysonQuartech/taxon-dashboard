/** @format */
//IMPORT React and Child Components
import React, { ReactNode, useState } from "react";
//IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Card, Grid, Theme, Typography } from "@mui/material";
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
  showDeleteConfirmation: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //padding: globalTheme.spacing(2),
    backgroundColor: globalTheme.palette.background.paper,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2,
  },
  titleClass: {
    fontWeight: globalTheme.typography.fontWeightLight + "!important",
    padding: globalTheme.spacing(1),
    paddingLeft: globalTheme.spacing(2),
    paddingRight: globalTheme.spacing(2),
    display: "flex",
  },
  buttonsContainer: {
    padding: globalTheme.spacing(2),
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two columns with equal width
    columnGap: globalTheme.spacing(2), // Add spacing between columns
    marginTop: globalTheme.spacing(2),
  },
  deleteConfirmationButton: {
    fontWeight: globalTheme.typography.fontWeightLight + "!important",
    width: "100%",
    border: "none",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: globalTheme.palette.primary.main,
      color: globalTheme.palette.common.white,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

/*
 *props.. row id
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
      {showDeleteConfirmation && <div className={classes.overlay} />}

      <Card className={classes.actionsCardClass}>
        <div className={classes.actionClass}>
          <Edit className={classes.iconClass} />
          <Typography> Edit</Typography>
        </div>
        <div className={classes.actionClass} onClick={handleDeleteClick}>
          <Delete className={classes.iconClass} />
          <Typography>Delete</Typography>
        </div>
      </Card>

      {showDeleteConfirmation && (
        <div className={classes.overlay}>
          <Card className={classes.showDeleteConfirmation}>
            <Typography className={classes.titleClass}>Are you sure you want to delete this row?</Typography>
            <Grid className={classes.buttonsContainer}>
              <button className={classes.deleteConfirmationButton} onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className={classes.deleteConfirmationButton}>Delete</button>
            </Grid>
          </Card>
        </div>
      )}
    </>
  );
};

export default RowActions;
