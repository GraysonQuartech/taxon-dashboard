/** @format */

// IMPORT React packages and components
import React from "react";
import { useTaxon } from "../contexts/taxonContext";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import TableRegular from "./TableRegular";
import TableCollapse from "./TableCollapse";
// IMPORT MUI packages
import { makeStyles } from "@mui/styles";
import { Grid, Theme, Typography } from "@mui/material";
// IMPORT Constants + Data + Helper Functions
import {
  helperGetQuantitativeDataArray,
  helperGetQualitativeDataArray,
  helperGetQualitativeOptions,
} from "../utils/helper_functions";
import { columnsQuantitative, columnsQualitative, columnsQualitativeOptions } from "../utils/constants";
import dataSet from "../datasets/taxon_data.json";
import { IqualitativeData, IquantitativeData, IqualitativeOptionData } from "../utils/datagrab";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  labelEnabled: {
    opacity: "100%",
    padding: globalTheme.spacing(1),
  },
  labelDisabled: {
    opacity: "20%",
    padding: globalTheme.spacing(1),
  },
  gridClass: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyContent: "space-between",
    padding: globalTheme.spacing(1),
  },
  tableEnabled: {
    opacity: "100%",
    padding: globalTheme.spacing(1),
    width: "49vw",
  },
  tableDisabled: {
    opacity: "20%",
    padding: globalTheme.spacing(1),
    width: "49vw",
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

  //Grabbing quantitative data
  const quantitativeDataArray = helperGetQuantitativeDataArray(
    contextTaxon,
    dataSet.xref_taxon_measurement_quantitative
  );

  //Grabbing qualitative data
  const qualitativeDataArray = helperGetQualitativeDataArray(contextTaxon, dataSet.xref_taxon_measurement_qualitative);

  // RETURN ELEMENT HERE
  return (
    <div>
      <FilterRow />
      <div className={contextTaxon ? classes.labelEnabled : classes.labelDisabled}>
        <TaxonDisplay />
      </div>
      <Grid container columns={2} spacing={2} className={classes.gridClass}>
        <div className={quantitativeDataArray.length ? classes.tableEnabled : classes.tableDisabled}>
          <TableRegular<IquantitativeData>
            tableName={"Quantative"}
            rows={quantitativeDataArray}
            columns={columnsQuantitative}
            getRowID={(row: IquantitativeData) => row.taxon_measurement_id}
          />
        </div>
        <div className={qualitativeDataArray.length ? classes.tableEnabled : classes.tableDisabled}>
          <TableCollapse<IqualitativeData>
            tableName={"Qualitative"}
            rows={qualitativeDataArray}
            columns={columnsQualitative}
            getRowID={(row: IqualitativeData) => row.taxon_measurement_id}
            renderSubTable={(row: IqualitativeData) => {
              //Grabbing qualitative data
              const qualitativeOptionDataArray = helperGetQualitativeOptions(
                row.taxon_measurement_id,
                dataSet.xref_taxon_measurement_qualitative_option
              );
              return (
                <div className={qualitativeOptionDataArray.length ? classes.tableEnabled : classes.tableDisabled}>
                  <TableRegular<IqualitativeOptionData>
                    tableName={"Options"}
                    rows={qualitativeOptionDataArray}
                    columns={columnsQualitativeOptions}
                    getRowID={(row: IqualitativeOptionData) => row.qualitative_option_id}
                  />
                </div>
              );
            }}
          />
        </div>
      </Grid>
    </div>
  );
};

export default Main;
