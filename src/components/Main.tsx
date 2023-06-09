/** @format */

// IMPORT React packages and components
import React, { useContext } from "react";
import { useTaxon } from "../contexts/taxonContext";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import TableRegular from "./TableRegular";
import TableCollapse from "./TableCollapse";
import SearchAll from "./SearchAll";
// IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Box, Grid, Theme, Typography } from "@mui/material";
// IMPORT Constants + Data + Helper Functions
import {
  helperGetQuantitativeDataArray,
  helperGetQualitativeDataArray,
  helperGetQualitativeOptions,
} from "../utils/helper_functions";
import { columnsQuantitative, columnsQualitative, columnsQualitativeOptions } from "../utils/constants";
import { IqualitativeData, IquantitativeData, IqualitativeOptionData } from "../utils/datagrab";
import gov3_bc_logo from "../images/gov3_bc_logo.png";
import { DataContext } from "../contexts/dataContext";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
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
  searchContainerClass: {
    //backgroundColor: globalTheme.palette.secondary.light,
    padding: globalTheme.spacing(1),
  },
  searchContainerGrid: {
    width: "100%",
    gridTemplateColumns: "80% auto",
    display: "grid",
    padding: globalTheme.spacing(1),
  },
  infoContainerClass: {
    backgroundColor: globalTheme.palette.secondary.light,
    padding: globalTheme.spacing(1),
    marginTop: globalTheme.spacing(2),
  },
  infoContainerClassDisabled: {
    backgroundColor: globalTheme.palette.secondary.light,
    padding: globalTheme.spacing(1),
    marginTop: globalTheme.spacing(2),
    opacity: "30%",
    pointerEvents: "none",
  },

  titleClass: {
    alignSelf: "end",
    display: "inline-block",
    padding: globalTheme.spacing(1),
    color: globalTheme.palette.secondary.dark,
  },
  displayGrid: {
    boxShadow: "none !important",
    gridTemplateColumns: "auto auto auto",
    justifyContent: "left",
    display: "grid",
    width: "70%",
    gridGap: globalTheme.spacing(6),
  },
  gridClass: {
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
  },
  tableEnabled: {
    opacity: "100%",
    padding: globalTheme.spacing(1),
  },
}));
/*
 * Main component function here
 * This component contains all other components
 */
const Main = () => {
  // HOOKS here
  const { contextTaxon } = useTaxon();
  const classes = useStyles();
  const dataContext = useContext(DataContext);

  // Check the type and properties of dropDownTaxons array
  console.log("Grabbing qualitative and quantitative measurements and passing down from main");
  console.log(dataContext.contextData); // Check if it is an array
  // ... Check other properties and methods as needed
  // RETURN ELEMENT HERE
  return (
    <div>
      <header className={classes.headerClass}>
        <img src={gov3_bc_logo} alt="BC Government Emblem" className={classes.logoClass} />
        <Typography variant="h6">Critterbase Taxon Dashboard</Typography>
      </header>
      <div className={classes.searchContainerClass}>
        <Grid className={classes.searchContainerGrid} columns={2}>
          <Typography className={classes.titleClass} variant="h6">
            Taxon Selection
          </Typography>
          <SearchAll dropDownTaxons={dataContext.contextData.lk_taxon} />
        </Grid>
        <FilterRow />
      </div>
      <Box className={contextTaxon ? classes.infoContainerClass : classes.infoContainerClassDisabled}>
        <Grid columns={2} className={classes.gridClass}>
          <div className={classes.tableEnabled}>
            <TableRegular<IquantitativeData>
              tableName={"Quantative Measurements"}
              rows={helperGetQuantitativeDataArray(
                contextTaxon,
                dataContext.contextData.xref_taxon_measurement_quantitative
              )}
              columns={columnsQuantitative}
              getRowID={(row: IquantitativeData) => row.taxon_measurement_id}
              dense={false}
            />
          </div>
          <div className={classes.tableEnabled}>
            <TableCollapse<IqualitativeData>
              tableName={"Qualitative Measurements"}
              rows={helperGetQualitativeDataArray(
                contextTaxon,
                dataContext.contextData.xref_taxon_measurement_qualitative
              )}
              columns={columnsQualitative}
              getRowID={(row: IqualitativeData) => row.taxon_measurement_id}
              renderSubTable={(row: IqualitativeData) => {
                //Grabbing qualitative data
                const qualitativeOptionDataArray = helperGetQualitativeOptions(
                  row.taxon_measurement_id,
                  dataContext.contextData.xref_taxon_measurement_qualitative_option
                );
                return (
                  <div className={classes.tableEnabled}>
                    <TableRegular<IqualitativeOptionData>
                      tableName={"Options"}
                      rows={qualitativeOptionDataArray}
                      columns={columnsQualitativeOptions}
                      getRowID={(row: IqualitativeOptionData) => row.qualitative_option_id}
                      dense={true}
                    />
                  </div>
                );
              }}
            />
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default Main;
