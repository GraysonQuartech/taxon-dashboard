/** @format */

import React, { useEffect, PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
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
  const [dataset, setDataset] = useState<dataSetInterface>(taxon_data as unknown as dataSetInterface);

  useEffect(() => {
    const taxonData = getTaxonDataset();

    if (!taxonData) {
      setTaxonDataset(getDefaultTaxonDataSet());
    }
  }, []);

  const getTaxonDataset = (): dataSetInterface | null => {
    return dataset;
  };

  const getDefaultTaxonDataSet = (): dataSetInterface => {
    return taxon_data as unknown as dataSetInterface;
  };

  const setTaxonDataset = (taxonData: dataSetInterface) => {
    localStorage.setItem(TAXON_DATASET, JSON.stringify(taxonData));
    setDataset(taxonData);
  };

  const contextData = useMemo(() => {
    return getTaxonDataset() ?? getDefaultTaxonDataSet();
  }, [dataset]);

  /*
   * Call this when editing the dataset
   * Receives the row data and the IDs. made generic to handle any row type
   */
  const editRowContextData = (rowID: string | number | null, row: any) => {
    const updatedDataSet = { ...contextData };

    let index = 0;
    for (const measurement of updatedDataSet.xref_taxon_measurement_quantitative) {
      const rowTyped = row as IquantitativeData;
      if (measurement.taxon_measurement_id === rowID) {
        rowTyped.taxon_id = rowTyped.taxon_id[0];
        updatedDataSet.xref_taxon_measurement_quantitative[index] = rowTyped;
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

    setTaxonDataset(updatedDataSet);
  };

  /*
   * Call this when deleteing a row in the dataset
   * Receives the row  IDs.
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

  const addRowContextData = (row: any) => {
    const updatedDataSet = { ...contextData };
    // Add your logic to add the new row to the dataset
    // ...

    setTaxonDataset(updatedDataSet);
  };

  return (
    <DataContext.Provider
      value={{
        contextData,
        editRowContextData,
        deleteRowContextData,
        addRowContextData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
