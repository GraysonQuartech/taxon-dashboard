/*
 * taxonContext.tsx
 */
import React, { PropsWithChildren, createContext, useState } from "react";
import { taxonInterface } from "../utils/datagrab";

export interface ITaxonContext {
  selectedTaxon: taxonInterface | null;
  setSelectedTaxon: (newTaxon: taxonInterface) => void;
}

//Create instance of object
export const TaxonContext = createContext<ITaxonContext>({
  selectedTaxon: null,
  setSelectedTaxon: (newTaxon: taxonInterface | null) => {},
});

//provider, a react component that provides/delivers the context
export const TaxonContextProvider = (props: PropsWithChildren<any>) => {
  const [selectedTaxon, setSelectedTaxon] = useState<taxonInterface | null>(
    null
  );

  //defines the context. available to any component under definition in app.tsx
  const taxonContext: ITaxonContext = {
    selectedTaxon,
    setSelectedTaxon,
  };

  return (
    <TaxonContext.Provider value={taxonContext}>
      {props.children}
    </TaxonContext.Provider>
  );
};
