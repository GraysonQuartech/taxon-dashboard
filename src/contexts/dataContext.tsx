/** @format */

import React, { useEffect, PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
import taxon_data from "../datasets/taxon_data.json";
import { IqualitativeData, IqualitativeOptionData, IquantitativeData, dataSetInterface } from "../utils/datagrab";
import { TableType } from "../utils/constants";

const TAXON_DATASET = "TAXON_DATASET";

// Define the interface for the data context
interface IDataContext {
  contextData: dataSetInterface;
  editRowContextData: (rowID: string | number | null, row: any) => void;
  deleteRowContextData: (rowID: string | number | null) => void;
  addRowContextData: (row: any, tableType: TableType) => void;
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

  /*
   *Called when user adding row to the dataset
   */
  const addRowContextData = (row: any, tableType: TableType) => {
    //temporary ID generator
    function generateRandomId(): string {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let randomId = "";

      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
      }

      return randomId;
    }
    /////temp

    const updatedDataSet = { ...contextData };
    console.log(row);

    if (tableType === "QuantitativeTable") {
      const quantitativeData: IquantitativeData = {
        taxon_measurement_id: generateRandomId(),
        taxon_id: row.taxon_id,
        measurement_name: row.measurement_name,
        measurement_desc: row.measurement_desc,
        min_value: row.min_value,
        max_value: row.max_value,
        unit: row.unit,
        create_user: "Grayson",
        update_user: "Grayson",
        create_timestamp: "2023-03-10T00:00:16.661Z",
        update_timestamp: "2023-03-10T00:00:16.661Z",
      };
      updatedDataSet.xref_taxon_measurement_quantitative.push(quantitativeData);
    } else if (tableType === "QualitativeTable") {
      const qualitativeData: IqualitativeData = {
        taxon_measurement_id: generateRandomId(),
        taxon_id: row.taxon_id,
        measurement_name: row.measurement_name,
        measurement_desc: row.measurement_desc,
        create_user: "Grayson",
        update_user: "Grayson",
        create_timestamp: "2023-03-10T20:51:27.708Z",
        update_timestamp: "2023-03-10T20:51:27.708Z",
      };
      updatedDataSet.xref_taxon_measurement_qualitative.push(qualitativeData);
    }

    //(tableType === "QualitativeOptionTable")
    else {
      const qualitativeOptionData: IqualitativeOptionData = {
        qualitative_option_id: generateRandomId(),
        taxon_measurement_id: "sdf",
        option_label: row.option_label,
        option_value: row.option_value,
        option_desc: row.option_desc,
        create_user: "Grayson",
        update_user: "Grayson",
        create_timestamp: "2023-03-10T20:51:27.708Z",
        update_timestamp: "2023-03-10T20:51:27.708Z",
      };
      updatedDataSet.xref_taxon_measurement_qualitative_option.push(qualitativeOptionData);
    }

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
