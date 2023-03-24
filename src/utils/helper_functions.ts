/*
 *This file contains helper functions, called across various componenets
 */

import dataSet from "../datasets/taxon_data.json";
import { classificationLevelArray } from "./constants";
import { taxonInterface, taxonInterfaceArray } from "./datagrab";

/*
 * Accepts a single lk_taxon element, which is
 * an array containing the current taxon levels and values
 * returns the current taxon_id value.
 */
export const getCurrentTaxonID = (currTaxonArray: taxonInterface): string => {
  return currTaxonArray.taxon_id;
};

/*
 * Accepts a taxon ID, and returns the latin name associated to it
 */
export const helperGetLatinNameFromID = (
  taxonId: string | null
): string | null => {
  for (let i = 0; i < dataSet.lk_taxon.length; i++) {
    const taxon = dataSet.lk_taxon[i];
    if (taxon.taxon_id === taxonId) {
      return taxon.taxon_name_latin;
    }
  }
  return null;
};

/*
 * This function takes the classification level as a string
 * And returns the associated ID
 */
const helperGetIdValue = (
  classificationLevel: string,
  currTaxonArray: taxonInterface
) => {
  switch (classificationLevel) {
    case "Kingdom":
      return currTaxonArray.kingdom_id;
    case "Phylum":
      return currTaxonArray.phylum_id;
    case "Class":
      return currTaxonArray.class_id;
    case "Order":
      return currTaxonArray.order_id;
    case "Family":
      return currTaxonArray.family_id;
    case "Genus":
      return currTaxonArray.genus_id;
    case "Species":
      return currTaxonArray.species_id;
    case "Sub-Species":
      return currTaxonArray.sub_species_id;
    default:
      return null;
  }
};

/*
 * Accepts a keyname string. which is the classification level
 * returns an array of taxon names associated to kingdom
 */
export const helperGetLatinNames = (classificationLevel: string): string[] => {
  const latinNames: string[] = [];
  const dataSetLength = dataSet.lk_taxon.length;

  //loop entire lk_taxon array
  for (let i = 0; i < dataSetLength; i++) {
    const currTaxonArray = dataSet.lk_taxon[i];
    const idValue = helperGetIdValue(classificationLevel, currTaxonArray);

    const name = helperGetLatinNameFromID(idValue);
    if (name !== null && !latinNames.includes(name)) {
      latinNames.push(name);
    }
  }

  return latinNames;
};
