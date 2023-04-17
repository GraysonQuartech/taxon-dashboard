/**
 * This file contains helper functions, called across various componenets
 *
 * @format
 */

import dataSet from "../datasets/taxon_data.json";
import { TaxonLevel, classificationLevelArray } from "./constants";
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
export const helperGetLatinNameFromID = (taxonId: string | null): string | null => {
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
const helperGetClassificationLevelID = (classificationLevel: string, taxon: taxonInterface): string | null => {
  switch (classificationLevel) {
    case "Kingdom":
      return taxon.kingdom_id;
    case "Phylum":
      return taxon.phylum_id;
    case "Class":
      return taxon.class_id;
    case "Order":
      return taxon.order_id;
    case "Family":
      return taxon.family_id;
    case "Genus":
      return taxon.genus_id;
    case "Species":
      return taxon.species_id;
    case "Sub-Species":
      return taxon.sub_species_id;
    default:
      return null;
  }
};

/*
 *Accepts a current taxon and its data in an interface,
 * and determines+returns the current classification level of it.
 */
export const helperGetClassificationLevel = (taxon: taxonInterface): TaxonLevel | null => {
  switch (null) {
    case taxon.kingdom_id:
      return "Kingdom";
    case taxon.phylum_id:
      return "Phylum";
    case taxon.class_id:
      return "Class";
    case taxon.order_id:
      return "Order";
    case taxon.family_id:
      return "Family";
    case taxon.genus_id:
      return "Genus";
    case taxon.species_id:
      return "Species";
    case taxon.sub_species_id:
      return "Sub_Species";
  }
  return null;
};

/*
 * accepts a taxon ID, and returns the Taxon interface associated to it
 * ie accepts "123" and returns an interface with kingdom id, phylum id, etc
 */
export const helperGetTaxonData = (taxon_id: string | null): taxonInterface | null => {
  if (taxon_id !== null) {
    for (const taxon of dataSet.lk_taxon) {
      if (taxon.taxon_id === taxon_id) {
        return taxon;
      }
    }
  }
  return null;
};

/*
 * Accepts a classificationLevel string.
 * returns an array of taxon names associated to it
 */
export const helperGetLatinNames = (classificationLevel: string): string[] => {
  const latinNames: string[] = [];
  const dataSetLength = dataSet.lk_taxon.length;

  //loop entire lk_taxon array
  for (let i = 0; i < dataSetLength; i++) {
    const taxon = dataSet.lk_taxon[i];
    const taxon_id = taxon.taxon_id;

    if (helperGetClassificationLevel(taxon) === classificationLevel) {
      const name = helperGetLatinNameFromID(taxon_id);
      if (name !== null) {
        latinNames.push(name);
      }
    }
  }

  return latinNames;
};

/*
 * Accepts a taxon classification Level Kingdom, phylum etc
 * Returns an array of taxons associated to that classification level
 */
export const helperGetTaxonsForClassificationLevel = (classificationLevel: TaxonLevel | null): taxonInterface[] => {
  //init empty taxon object array
  const taxonArray: taxonInterface[] = [];
  const dataSetLength = dataSet.lk_taxon.length;

  //loop entire lk_taxon array
  for (let i = 0; i < dataSetLength; i++) {
    const taxon = dataSet.lk_taxon[i];
    const taxon_id = taxon.taxon_id;

    if (helperGetClassificationLevel(taxon) === classificationLevel) {
      const name = helperGetLatinNameFromID(taxon_id);
      if (name !== null) {
        taxonArray.push(taxon);
      }
    }
  }

  return taxonArray;
};

/*
 * Takes two TaxonLevels,
 * returns true if the first one is at a lower index in the array than the second one
 */
export const helperIsHigherClassificationLevel = (taxonLevel1: TaxonLevel, taxonLevel2: TaxonLevel): boolean => {
  const index1 = classificationLevelArray.indexOf(taxonLevel1);
  const index2 = classificationLevelArray.indexOf(taxonLevel2);
  return index1 < index2;
};
