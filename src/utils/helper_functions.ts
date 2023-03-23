/*
 *This file contains helper functions, called across various componenets
 */

import dataSet from "../datasets/taxon_data.json";
import { taxonInterface, taxonInterfaceArray } from "./datagrab";

/*
 * This function takes the classification level as a string
 * And returns the associated ID
 */
const getKeyFromName = (
  classificationLevel: string,
  currTaxon: taxonInterface
) => {
  switch (classificationLevel) {
    case "Kingdom":
      return currTaxon.kingdom_id;
    case "Phylum":
      return currTaxon.phylum_id;
    case "Class":
      return currTaxon.class_id;
    case "Order":
      return currTaxon.order_id;
    case "Family":
      return currTaxon.family_id;
    case "Genus":
      return currTaxon.genus_id;
    case "Species":
      return currTaxon.species_id;
    case "Sub_Species":
      return currTaxon.sub_species_id;
    default:
      return null;
  }
};

/*
 * Accepts a keyname string. which is the classification level
 * returns an array of taxon names associated to kingdom
 */
export const helperGetLatinNames = (classificationLevel: string): string[] => {
  const latinNames: string[] = dataSet.lk_taxon
    .filter(
      (currTaxon: taxonInterface) =>
        getKeyFromName(classificationLevel, currTaxon) === null
    )
    .map((currTaxon) => currTaxon.taxon_name_latin);

  return latinNames;
};
