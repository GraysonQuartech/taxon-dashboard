/** @format */

import React, { useEffect, PropsWithChildren, createContext, useContext, useMemo } from "react";
import taxon_data from "../datasets/taxon_data.json";
import { IqualitativeData, IqualitativeOptionData, IquantitativeData, dataSetInterface } from "../utils/datagrab";

const TAXON_DATASET = "TAXON_DATASET";

// Define the interface for the data context
interface IDataContext {
  contextData: dataSetInterface;
  editRowContextData: (rowID: string | number | null, row: any) => void;
  deleteRowContextData: (rowID: string | number | null) => void;
  addRowContextData: (row: any) => void;
}

// Create the data context using createContext
export const DataContext = createContext<IDataContext>({
  contextData: taxon_data as unknown as dataSetInterface, // Set the initial value for contextData using taxon_data
  editRowContextData: () => {}, // Define a dummy function for editRowContextData
  deleteRowContextData: () => {},
  addRowContextData: () => {},
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
   * Call this when editing the dataset
   * Receives the row data and the IDs. made generic to handle any row type
   */
  const editRowContextData = (rowID: string | number | null, row: any) => {
    // Copy the current context data
    const updatedDataSet = { ...contextData };
    console.log("ATTEMPTING SET CONTEXT DATA");
    let index = 0;
    for (const measurement of updatedDataSet.xref_taxon_measurement_quantitative) {
      const rowTyped = row as IquantitativeData;
      if (measurement.taxon_measurement_id === rowID) {
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
      if (measurement.taxon_measurement_id === rowID) {
        rowTyped.taxon_id = rowTyped.taxon_id[0];
        updatedDataSet.xref_taxon_measurement_qualitative[index] = rowTyped;
      }
      index += 1;
    }

    index = 0;
    for (const option of updatedDataSet.xref_taxon_measurement_qualitative_option) {
      const rowTyped = row as IqualitativeOptionData;
      if (option.qualitative_option_id === rowID) {
        updatedDataSet.xref_taxon_measurement_qualitative_option[index] = rowTyped;
      }
      index += 1;
    }

    // Update the current context data by saving the updated dataset to localStorage
    setTaxonDataset(updatedDataSet);
  };

  /*
   *Receives row ID and handles deleting that row from the temp data set
   */
  const deleteRowContextData = (rowID: string | number | null) => {
    const updatedDataSet = { ...contextData };

    updatedDataSet.xref_taxon_measurement_quantitative = updatedDataSet.xref_taxon_measurement_quantitative.filter(
      (measurement) => measurement.taxon_measurement_id !== rowID
    );

    updatedDataSet.xref_taxon_measurement_qualitative = updatedDataSet.xref_taxon_measurement_qualitative.filter(
      (measurement) => measurement.taxon_measurement_id !== rowID
    );

    updatedDataSet.xref_taxon_measurement_qualitative_option =
      updatedDataSet.xref_taxon_measurement_qualitative_option.filter(
        (measurement) => measurement.qualitative_option_id !== rowID
      );

    setTaxonDataset(updatedDataSet);
  };

  /*
   *Receives row values and saves a new row in the database. giving it a unique measurement ID
   */
  const addRowContextData = (row: any) => {
    const updatedDataSet = { ...contextData };
    setTaxonDataset(updatedDataSet);
  };

  // Provide the data context value and render the children components
  return (
    <DataContext.Provider
      value={{
        contextData: getTaxonDataset() ?? getDefaultTaxonDataSet(),
        editRowContextData,
        deleteRowContextData,
        addRowContextData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
