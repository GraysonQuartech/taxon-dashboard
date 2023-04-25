/** @format */

// IMPORT React packages and components
// import React from "react";
import { useTaxon } from "../contexts/taxonContext";
import FilterRow from "./FilterRow";
import TaxonDisplay from "./TaxonDisplay";
import QuantitativeData from "./QuantitativeData";
import QualitativeData from "./QualitativeData";
// IMPORT MUI packages
import { GridColDef } from "@mui/x-data-grid";
import { Card, CardContent, Typography, Theme } from "@mui/material";
// IMPORT Constants + Data + Helper Functions
import {
  helperGetQuantitativeDataArray,
  helperGetQualitativeDataArray,
  helperGetQualitativeOptionDataArray,
} from "../utils/helper_functions";
import { IquantitativeData, IqualitativeData } from "../utils/datagrab";
import dataSet from "../datasets/taxon_data.json";

/*
 * Main component function here
 * This component contains all other components
 */
const Main = () => {
  // HOOKS here
  const { contextTaxon } = useTaxon();

  //Grabbing quantitative data
  const quantitativeDataArray = helperGetQuantitativeDataArray(
    contextTaxon?.taxon_id || "",
    dataSet.xref_taxon_measurement_quantitative
  );

  //Grabbing qualitative data
  const qualitativeDataArray = helperGetQualitativeDataArray(
    contextTaxon?.taxon_id || "",
    dataSet.xref_taxon_measurement_qualitative
  );

  //quantitative data columns
  const columnsQuantitative: GridColDef<IquantitativeData>[] = [
    { field: "measurement_name", headerName: "Name", flex: 1 },
    { field: "measurement_desc", headerName: "Description", flex: 1 },
    { field: "min_value", headerName: "Min Value", flex: 1 },
    { field: "max_value", headerName: "Max Value", flex: 1 },
    { field: "unit", headerName: "Unit", flex: 1 },
  ];

  //qualitative data columns
  const columnsQualitative: GridColDef<IqualitativeData>[] = [
    { field: "measurement_name", headerName: "Name", flex: 1 },
    { field: "measurement_desc", headerName: "Description", flex: 1 },
  ];

  // RETURN ELEMENT HERE
  return (
    <div>
      <FilterRow />
      <TaxonDisplay />
      <QuantitativeData rows={quantitativeDataArray} columns={columnsQuantitative} />
      <QualitativeData
        rows={qualitativeDataArray}
        columns={columnsQualitative}
        subColumns={columnsQualitative}
        subDataSet={dataSet.xref_taxon_measurement_qualitative_option}
      />
    </div>
  );
};

export default Main;
//
//
