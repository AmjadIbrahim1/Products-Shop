import { createContext } from "react";
import type { ProductType } from "../types/ProductType";

interface FormContextType {
  showFormInput: boolean;
  setShowFormInput: React.Dispatch<React.SetStateAction<boolean>>;
  Products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editProductId: string | null;
  setEditProductId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const showFormInputContext = createContext<FormContextType>({
  showFormInput: false,
  setShowFormInput: () => {},
  Products: [],
  setProducts: () => {},
  isEdit: false,
  setIsEdit: () => {},
  editProductId: null,
  setEditProductId: () => {},
});
