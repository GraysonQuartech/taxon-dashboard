/*
 *This file contains helper functions, called across various componenets
 */

import dataSet from "../datasets/taxon_data.json";
import { taxonInterface } from "./datagrab";

/*
 *to be generalized for id's
 * returns an array of taxon names associated to kingdom
 */
export const helperGetLatinNames = (): string[] => {
  const myData: taxonInterface = dataSet;
  const latinNames: string[] = myData.lk_taxon
    .filter((item) => item.kingdom_id === null)
    .map((item) => item.taxon_name_latin);

  return latinNames;
};
