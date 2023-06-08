/** @format */
import React, { useEffect, PropsWithChildren, createContext, useState, useContext, useMemo } from "react";
import taxon_data from "../datasets/taxon_data.json";
import { dataSetInterface, taxonInterface } from "../utils/datagrab";

const TAXON_DATASET = "TAXON_DATASET";

///////////////
interface IDataContext {
  contextData: dataSetInterface;
  setContextData: (dataset: dataSetInterface) => void;
}
///////////////////////////////////////

/**
 * Gets the taxon dataset from localstorage
 */

useEffect(() => {
  const jsonData = localStorage.getItem(TAXON_DATASET);

  if (!jsonData) {
    setTaxonDataset(taxon_data as unknown as dataSetInterface);
  }
}, []); // Runs only on first render

const getTaxonDataset = (): dataSetInterface => {
  return JSON.parse(localStorage.getItem(TAXON_DATASET) ?? "{}");
};

const setTaxonDataset = (taxonData: dataSetInterface) => {
  localStorage.setItem(TAXON_DATASET, JSON.stringify(taxonData));
};

///////////////////////////////////////
const DataContext = createContext<IDataContext>({
  contextData: taxon_data as unknown as dataSetInterface,
  setContextData: () => {},
});

export const useData = () => useContext(DataContext);

// Provider, a react component that provides/delivers the context
export const DataContextProvider = (props: PropsWithChildren<{}>) => {
  const contextData = useMemo(() => {
    return getTaxonDataset();
  }, [localStorage]);

  return (
    // Defines the context. available to any component under definition in app.tsx
    <DataContext.Provider value={{ contextData, setContextData: setTaxonDataset }}>
      {props.children}
    </DataContext.Provider>
  );
};
