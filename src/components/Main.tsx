/** @format */

// IMPORT React packages and components
import React from "react";
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
import dataSet from "../datasets/taxon_data.json";
import { IqualitativeData, IquantitativeData, IqualitativeOptionData } from "../utils/datagrab";

/*
 * STYLE definitions for useStyles hook
 * and global theme
 */
const useStyles = makeStyles((globalTheme: Theme) => ({
  infoContainerClass: {
    backgroundColor: globalTheme.palette.secondary.light,
    padding: "0px",
  },
  titleClass: {
    alignSelf: "end",
    display: "inline-block",
    padding: globalTheme.spacing(1),
    color: globalTheme.palette.secondary.dark,
  },
  labelEnabled: {
    opacity: "100%",
    padding: globalTheme.spacing(1),
  },
  labelDisabled: {
    opacity: "20%",
    padding: globalTheme.spacing(1),
  },
  headerGrid: {
    width: "100%",
    gridTemplateColumns: "80% auto",
    display: "grid",
    padding: globalTheme.spacing(1),
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
    gridTemplateColumns: "1fr 1fr",
    justifyContent: "center",
  },
  tableEnabled: {
    opacity: "100%",
    padding: globalTheme.spacing(1),
  },
  tableDisabled: {
    opacity: "20%",
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
      <Grid className={classes.headerGrid} columns={2}>
        <Typography className={classes.titleClass} variant="h5">
          Taxon Selection
        </Typography>
        <SearchAll dropDownTaxons={dataSet.lk_taxon} />
      </Grid>
      <FilterRow />
      <Box className={classes.infoContainerClass}>
        <div className={contextTaxon ? classes.labelEnabled : classes.labelDisabled}>
          <Typography className={classes.titleClass} variant="h6">
            Current Taxon
          </Typography>
          <Grid className={classes.displayGrid} columns={3}>
            <TaxonDisplay title={"Latin"} value={contextTaxon?.taxon_name_latin} />
            <TaxonDisplay title={"Taxon ID"} value={contextTaxon?.taxon_id} />
            <TaxonDisplay title={"Updated"} value={contextTaxon?.update_timestamp} />
          </Grid>
        </div>
        <Grid columns={2} className={classes.gridClass}>
          <div className={quantitativeDataArray.length ? classes.tableEnabled : classes.tableDisabled}>
            <TableRegular<IquantitativeData>
              tableName={"Quantative Measurements"}
              rows={quantitativeDataArray}
              columns={columnsQuantitative}
              getRowID={(row: IquantitativeData) => row.taxon_measurement_id}
              dense={false}
            />
          </div>
          <div className={qualitativeDataArray.length ? classes.tableEnabled : classes.tableDisabled}>
            <TableCollapse<IqualitativeData>
              tableName={"Qualitative Measurements"}
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
