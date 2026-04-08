import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Store, type StoreModel } from "./store";

export const FuriganaGeneratorContext = createContext<StoreModel>(
  new Store({
    defaultText: "",
    defaultFurigana: null,
    defaultError: null,
  }),
);

export const useStore = () => useContext(FuriganaGeneratorContext);
