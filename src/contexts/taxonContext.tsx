import React, {
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { taxonInterface } from "../utils/datagrab";

interface ITaxonContext {
  selectedTaxon: taxonInterface | null;
  setSelectedTaxon: React.Dispatch<React.SetStateAction<taxonInterface | null>>;
}

const TaxonContext = createContext<ITaxonContext>({
  selectedTaxon: null,
  setSelectedTaxon: () => {},
});

export const useTaxon = () => useContext(TaxonContext);

// Provider, a react component that provides/delivers the context
export const TaxonContextProvider = (props: PropsWithChildren<{}>) => {
  const [selectedTaxon, setSelectedTaxon] = useState<taxonInterface | null>(
    null
  );

  return (
    // Defines the context. available to any component under definition in app.tsx
    <TaxonContext.Provider value={{ selectedTaxon, setSelectedTaxon }}>
      {props.children}
    </TaxonContext.Provider>
  );
};
