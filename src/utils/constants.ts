/**
 * This file contains constants definitions
 *
 * @format
 */
// IMPORT MUI packages
import { GridColDef } from "@mui/x-data-grid";
// IMPORT DATA
import { IquantitativeData, IqualitativeData, IqualitativeOptionData } from "../utils/datagrab";

export type TaxonLevel = "Kingdom" | "Phylum" | "Class" | "Order" | "Family" | "Genus" | "Species" | "Sub_Species";
export const classificationLevelArray: TaxonLevel[] = [
  "Kingdom",
  "Phylum",
  "Class",
  "Order",
  "Family",
  "Genus",
  "Species",
  "Sub_Species",
];

//quantitative data columns
export const columnsQuantitative = [
  { field: "measurement_name", headerName: "Name", flex: 1 },
  { field: "measurement_desc", headerName: "Description", flex: 1 },
  { field: "min_value", headerName: "Min Value", flex: 1 },
  { field: "max_value", headerName: "Max Value", flex: 1 },
  { field: "unit", headerName: "Unit", flex: 1 },
];

//qualitative data columns
export const columnsQualitative = [
  { field: "measurement_name", headerName: "Name", flex: 1 },
  { field: "measurement_desc", headerName: "Description", flex: 1 },
];

//qualitative options data columns
export const columnsQualitativeOptions: GridColDef<IqualitativeOptionData>[] = [
  { field: "option_label", headerName: "label", flex: 1 },
  { field: "option_value", headerName: "Value", flex: 1 },
  { field: "option_desc", headerName: "Description", flex: 1 },
];
