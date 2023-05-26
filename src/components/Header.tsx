import { Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import gov3_bc_logo from "../images/gov3_bc_logo.png";

const useStyles = makeStyles((globalTheme: Theme) => ({
  headerClass: {
    backgroundColor: globalTheme.palette.primary.dark,
    height: "72px",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    padding: "0 32px",
    color: globalTheme.palette.primary.contrastText,
    paddingLeft: "0px",
  },
  logoClass: {
    height: "48px",
    margin: "14px",
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.headerClass}>
      <img
        src={gov3_bc_logo}
        alt="BC Government Emblem"
        className={classes.logoClass}
      />
      <Typography variant="h6">Critterbase Taxon Dashboard</Typography>
    </header>
  );
};
