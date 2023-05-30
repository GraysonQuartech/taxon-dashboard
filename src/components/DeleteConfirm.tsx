/** @format */

import React, { ReactNode, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Card, Grid, Theme, Typography } from "@mui/material";

const useStyles = makeStyles((globalTheme: Theme) => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 3,
  },
  showDeleteConfirmation: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: globalTheme.spacing(4),
    backgroundColor: globalTheme.palette.background.paper,
  },
  titleClass: {
    fontWeight: globalTheme.typography.fontWeightLight + "!important",
    padding: globalTheme.spacing(2),
    display: "flex",
  },
  buttonsContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: globalTheme.spacing(2),
    marginTop: globalTheme.spacing(2),
  },
  deleteConfirmationButton: {
    border: `1px solid`,
    borderColor: globalTheme.palette.secondary.dark,
    borderRadius: "6px",
    padding: globalTheme.spacing(2),
    fontWeight: globalTheme.typography.fontWeightLight + "!important",
    width: "100%",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: globalTheme.palette.primary.main,
      color: globalTheme.palette.common.white,
      cursor: "pointer",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface RowActionsProps {
  rowID: string;
  open: boolean;
}

const DeleteConfirm = (props: RowActionsProps) => {
  const { open } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(open); // State variable to manage open/close state

  useEffect(() => {
    setIsOpen(open); // Update the state when the prop changes
  }, [open]);

  const handleCancel = () => {
    setIsOpen(false); // Close the component
  };

  const handleDelete = () => {
    setIsOpen(false); // Close the component
    // Handle delete logic if needed
  };

  return isOpen ? (
    <div className={classes.overlay}>
      <Card className={classes.showDeleteConfirmation}>
        <Typography className={classes.titleClass}>Are you sure you want to delete this measurement?</Typography>
        <Grid className={classes.buttonsContainer}>
          <button className={classes.deleteConfirmationButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={classes.deleteConfirmationButton} onClick={handleDelete}>
            Delete
          </button>
        </Grid>
      </Card>
    </div>
  ) : null;
};

export default DeleteConfirm;
