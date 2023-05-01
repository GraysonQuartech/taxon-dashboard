/**
 * This file contains constants definitions
 *
 * @format
 */
// IMPORT MUI packages
// IMPORT DATA

import { IqualitativeData, IqualitativeOptionData, IquantitativeData } from "./datagrab";

export type TaxonLevel = "Kingdom" | "Phylum" | "Class" | "Order" | "Family" | "Genus" | "Species" | "Sub Species";
export const classificationLevelArray: TaxonLevel[] = [
  "Kingdom",
  "Phylum",
  "Class",
  "Order",
  "Family",
  "Genus",
  "Species",
  "Sub Species",
];

export interface IColumn<T> {
  field: keyof T;
  headerName: string;
}

//quantitative data columns
export const columnsQuantitative: IColumn<IquantitativeData>[] = [
  { field: "measurement_name", headerName: "Measurement" },
  { field: "min_value", headerName: "Min Value" },
  { field: "max_value", headerName: "Max Value" },
  { field: "unit", headerName: "Unit" },
  { field: "measurement_desc", headerName: "Description" },
  { field: "taxon_id", headerName: "Taxon" },
];

//qualitative data columns
export const columnsQualitative: IColumn<IqualitativeData>[] = [
  { field: "measurement_name", headerName: "Measurement" },
  { field: "measurement_desc", headerName: "Description" },
  { field: "taxon_id", headerName: "Taxon" },
];

//qualitative options data columns
export const columnsQualitativeOptions: IColumn<IqualitativeOptionData>[] = [
  { field: "option_label", headerName: "label" },
  { field: "option_value", headerName: "Value" },
  { field: "option_desc", headerName: "Description" },
];
