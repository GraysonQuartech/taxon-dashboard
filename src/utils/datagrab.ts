/*
 *This file is responsible for communicating with the dataset
 *It imports the dataset, and creates interfaces for the data
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
