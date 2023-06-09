/** @format */

import React, { useEffect, PropsWithChildren, createContext, useContext, useMemo } from "react";
import taxon_data from "../datasets/taxon_data.json";
import { IqualitativeData, IquantitativeData, dataSetInterface } from "../utils/datagrab";

const TAXON_DATASET = "TAXON_DATASET";

// Define the interface for the data context
interface IDataContext {
  contextData: dataSetInterface;
  setContextData: (measurementID: string | number | null, row: any) => void;
}

// Create the data context using createContext
export const DataContext = createContext<IDataContext>({
  contextData: taxon_data as unknown as dataSetInterface, // Set the initial value for contextData using taxon_data
  setContextData: () => {}, // Define a dummy function for setContextData
});

// Custom hook for using the data context
//export const useData = () => useContext(DataContext);

// Data context provider component
export const DataContextProvider = (props: PropsWithChildren<{}>) => {
  useEffect(() => {
    console.log("context use effect");

    const taxonData = getTaxonDataset();

    if (!taxonData) {
      setTaxonDataset(getDefaultTaxonDataSet()); // Set the initial dataset to taxon_data if it doesn't exist in localStorage
    }
  });

  const getTaxonDataset = (): dataSetInterface | null => {
    const temp = localStorage.getItem(TAXON_DATASET);
    return temp ? JSON.parse(temp) : null;
  };

  const getDefaultTaxonDataSet = (): dataSetInterface => {
    return taxon_data as unknown as dataSetInterface;
  };

  // Save the dataset to localStorage
  const setTaxonDataset = (taxonData: dataSetInterface) => {
    localStorage.setItem(TAXON_DATASET, JSON.stringify(taxonData));
    console.log("Setting local storage to: ");
    console.log(taxonData.xref_taxon_measurement_quantitative);
  };

  const contextData = useMemo(() => {
    console.log("useMemo()");
    return getTaxonDataset() ?? getDefaultTaxonDataSet();
  }, [localStorage]);

  //const contextData = getTaxonDataset() ?? getDefaultTaxonDataSet();

  /*
   * Call this when updating the dataset
   */
  const setContextData = (measurementID: string | number | null, row: any) => {
    // Copy the current context data
    const updatedDataSet = { ...contextData };
    console.log("ATTEMPTING SET CONTEXT DATA");
    let index = 0;
    for (const measurement of updatedDataSet.xref_taxon_measurement_quantitative) {
      const rowTyped = row as IquantitativeData;
      if (measurement.taxon_measurement_id === measurementID) {
        rowTyped.taxon_id = rowTyped.taxon_id[0];
        updatedDataSet.xref_taxon_measurement_quantitative[index] = rowTyped;
        console.log("Context data set to this row: ");
        console.log(rowTyped);
      }
      index += 1;
    }

    index = 0;
    for (const measurement of updatedDataSet.xref_taxon_measurement_qualitative) {
      const rowTyped = row as IqualitativeData;
      if (measurement.taxon_measurement_id === measurementID) {
        rowTyped.taxon_id = rowTyped.taxon_id[0];
        updatedDataSet.xref_taxon_measurement_qualitative[index] = rowTyped;
      }
      index += 1;
    }

    // Update the current context data by saving the updated dataset to localStorage
    setTaxonDataset(updatedDataSet);
  };

  // Provide the data context value and render the children components
  return (
    <DataContext.Provider value={{ contextData: getTaxonDataset() ?? getDefaultTaxonDataSet(), setContextData }}>
      {props.children}
    </DataContext.Provider>
  );
};
