/**
 * This file is responsible for communicating with the dataset
 * It imports the dataset, and creates interfaces for the data
 *
 * @format
 */

import data from "../datasets/taxon_data.json";

export interface taxonInterfaceArray {
  lk_taxon: taxonInterface[];
}
export interface taxonInterface {
  taxon_id: string;
  kingdom_id: string | null;
  phylum_id: string | null;
  class_id: string | null;
  order_id: string | null;
  family_id: string | null;
  genus_id: string | null;
  species_id: string | null;
  sub_species_id: string | null;
  taxon_name_common: string | null;
  taxon_name_latin: string;
  spi_taxonomy_id: number;
  taxon_description: string | null;
  create_user: string;
  update_user: string;
  create_timestamp: string;
  update_timestamp: string;
}

export interface IquantitativeDataArray {
  xref_taxon_measurement_quantitative: IquantitativeData[];
}
export interface IquantitativeData extends Record<string, string | number | null> {
  taxon_measurement_id: string;
  taxon_id: string;
  measurement_name: string;
  measurement_desc: string;
  min_value: number;
  max_value: number;
  unit: string;
  create_user: string;
  update_user: string;
  create_timestamp: string;
  update_timestamp: string;
}

export interface IqualitativeDataArray {
  xref_taxon_measurement_qualitative: IqualitativeData[];
}
export interface IqualitativeData extends Record<string, string | number | null> {
  taxon_measurement_id: string;
  taxon_id: string;
  measurement_name: string | null;
  measurement_desc: string | null;
  create_user: string | null;
  update_user: string | null;
  create_timestamp: string | null;
  update_timestamp: string | null;
}

export interface IqualitativeOptionDataArray {
  xref_taxon_measurement_qualitative_option: IqualitativeOptionData[];
}
export interface IqualitativeOptionData extends Record<string, string | number | null> {
  qualitative_option_id: string;
  taxon_measurement_id: string;
  option_label: string | null;
  option_value: number;
  option_desc: string | null;
  create_user: string | null;
  update_user: string | null;
  create_timestamp: string | null;
  update_timestamp: string | null;
}
