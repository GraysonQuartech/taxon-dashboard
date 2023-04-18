/** @format */

import React, { PropsWithChildren, createContext, useState, Dispatch, SetStateAction, useContext } from "react";
import { taxonInterface } from "../utils/datagrab";

interface ITaxonContext {
  contextTaxon: taxonInterface | null;
  setContextTaxon: React.Dispatch<React.SetStateAction<taxonInterface | null>>;
}

const TaxonContext = createContext<ITaxonContext>({
  contextTaxon: null,
  setContextTaxon: () => {},
});

export const useTaxon = () => useContext(TaxonContext);

// Provider, a react component that provides/delivers the context
export const TaxonContextProvider = (props: PropsWithChildren<{}>) => {
  const [contextTaxon, setContextTaxon] = useState<taxonInterface | null>(null);

  return (
    // Defines the context. available to any component under definition in app.tsx
    <TaxonContext.Provider value={{ contextTaxon, setContextTaxon }}>{props.children}</TaxonContext.Provider>
  );
};
