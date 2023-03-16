/*
 *This file contains constants definitions
 */

export const testArray: string[] = ["Pengu", "Saskwatch", "Monkee"];

/*
 * ClassificationLevel is used by FilterRow.tsx and
 * Filter.tsx to track the classificationLevel of a taxon
 * likely to be updated/changed..
 */
export const enum ClassificationLevel {
  KINGDOM = 0,
  PHYLUM = 1,
  CLASS = 2,
  ORDER = 3,
  FAMILY = 4,
  GENUS = 5,
  SPECIES = 6,
  SUBSPECIES = 7,
}
