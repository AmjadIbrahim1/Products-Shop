import ProductCard from "./components/ProductCard";
import { useState } from "react";
import { products } from "./data/data";
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import { showFormInputContext } from "./contexts/FormContext";
import RemovePopup from "./components/RemovePopup";
function App() {
  let [Products, setProducts] = useState(products);
  let [showFormInput, setShowFormInput] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [editProductId, setEditProductId] = useState<string | null>(null);

  return (
    <showFormInputContext.Provider
      value={{
        Products,
        setProducts,
        showFormInput,
        setShowFormInput,
        isEdit,
        setIsEdit,
        editProductId,
        setEditProductId,
      }}
    >
      <div>
        {showFormInput && <FormInput />}
        <Header />
        <div className="w-full flex justify-center">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </showFormInputContext.Provider>
  );
}

export default App;
