/*
 *This file contains helper functions, called across various componenets
 */

import dataSet from "../datasets/taxon_data.json";
import { ILkTaxon, taxonInterfaceArray } from "./datagrab";

const getKeyFromName = (keyName: string, myData: ILkTaxon) => {
  switch (keyName) {
    case "Kingdom":
      return myData.kingdom_id;
    case "Phylum":
      return myData.phylum_id;
    case "Class":
      return myData.class_id;
    case "Order":
      return myData.order_id;
    case "Family":
      return myData.family_id;
    case "Genus":
      return myData.genus_id;
    case "Species":
      return myData.species_id;
    case "Sub_Species":
      return myData.sub_species_id;
    default:
      return null;
  }
};

/*
 *to be generalized for id's
 * Accepts a keyname string. which is the classification level
 * returns an array of taxon names associated to kingdom
 */
export const helperGetLatinNames = (keyName: string): string[] => {
  const myData: taxonInterfaceArray = dataSet;
  const latinNames: string[] = myData.lk_taxon
    .filter((item: ILkTaxon) => getKeyFromName(keyName, item) === null)
    .map((item) => item.taxon_name_latin);

  return latinNames;
};
