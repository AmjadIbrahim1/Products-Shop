import { createContext } from "react";

export const showFormInputContext = createContext({
    showFormInput: false,
    setShowFormInput: (value: boolean) => {},
});
