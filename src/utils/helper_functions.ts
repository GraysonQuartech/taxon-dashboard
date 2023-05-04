/**
 * This file contains helper functions, called across various componenets
 *
 * @format
 */

import dataSet from "../datasets/taxon_data.json";
import { TaxonLevel, classificationLevelArray } from "./constants";
import { IquantitativeData, taxonInterface, IqualitativeData, IqualitativeOptionData } from "./datagrab";

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
      return "Sub Species";
  }
  return null;
};

/*
 *Receives a taxon at classification level X, and returns the taxon at classification
 * level X-1 - if level X-1 exists. IE if contextTaxon = phylum, it will return the
 * taxon at kingdom. if kingom set to null, then currently returns undefined
 */
export const helperGetNextAvailableTaxon = (
  prevContextTaxon: taxonInterface,
  classificationLevelOfSelected: TaxonLevel
): taxonInterface | null => {
  const index = classificationLevelArray.indexOf(classificationLevelOfSelected) - 1;
  const newClassLevel = classificationLevelArray[index];
  return helperGetTaxonData(helperGetClassificationLevelID(newClassLevel, prevContextTaxon));
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
*    {
      "taxon_id": "deaeef07-f954-4780-a35f-d1a3e906badf",
      "kingdom_id": "92072613-325f-4dba-a65b-d8a4fe2206ef",
      "phylum_id": "2b2273d0-e6b6-43e5-b4e0-378c3df3e6f4",
      "class_id": null,
      "order_id": null,
      "family_id": null,
      "genus_id": null,
      "species_id": null,
      "sub_species_id": null,
      "taxon_name_common": null,
      "taxon_name_latin": "Mammalia",
      "spi_taxonomy_id": -1,
      "taxon_description": null,
      "create_user": "d62376e5-58a6-4514-a2cc-e15a8eda3522",
      "update_user": "d62376e5-58a6-4514-a2cc-e15a8eda3522",
      "create_timestamp": "2023-03-10T00:00:12.320Z",
      "update_timestamp": "2023-03-10T00:00:12.320Z"
    }
*/

/*
 * accepts a taxon ID, and returns an array of Quantitative Data associated to it and its parent taxon levels
 */
export const helperGetQuantitativeDataArray = (contextTaxon: taxonInterface | null, data: any): IquantitativeData[] => {
  let quantitativeDataArray: IquantitativeData[] = [];
  if (contextTaxon) {
    for (const quantitativeData of data) {
      if (quantitativeData.taxon_id === contextTaxon.taxon_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.kingdom_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.class_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.phylum_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.order_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.family_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.genus_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.species_id) {
        quantitativeDataArray.push(quantitativeData);
      } else if (quantitativeData.taxon_id === contextTaxon.sub_species_id) {
        quantitativeDataArray.push(quantitativeData);
      }
    }
  }
  return quantitativeDataArray;
};

/*
 * accepts a taxon ID, and returns an array of Qualitative Data associated to it and its parent taxon levels
 */
export const helperGetQualitativeDataArray = (contextTaxon: taxonInterface | null, data: any): IqualitativeData[] => {
  let qualitativeDataArray: IqualitativeData[] = [];
  if (contextTaxon) {
    for (const qualitativeData of data) {
      if (qualitativeData.taxon_id === contextTaxon.taxon_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.kingdom_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.class_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.phylum_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.order_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.family_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.genus_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.species_id) {
        qualitativeDataArray.push(qualitativeData);
      } else if (qualitativeData.taxon_id === contextTaxon.sub_species_id) {
        qualitativeDataArray.push(qualitativeData);
      }
    }
  }
  return qualitativeDataArray;
};

/*
 * accepts a taxon measurement ID, and returns an array of Qualitative Data associated to it
 */
export const helperGetQualitativeOptions = (taxon_measurement_id: string, data: any): IqualitativeOptionData[] => {
  let qualitativeOptionDataArray: IqualitativeOptionData[] = [];
  for (const qualitativeOptionData of data) {
    if (qualitativeOptionData.taxon_measurement_id === taxon_measurement_id) {
      qualitativeOptionDataArray.push(qualitativeOptionData);
    }
  }
  return qualitativeOptionDataArray;
};

export const helperGetColorFromID = (taxonID: string): string => {
  return "444444";
};
