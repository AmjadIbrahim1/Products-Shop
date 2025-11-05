import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { products as defaultProducts } from "./data/data";
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import { showFormInputContext } from "./contexts/FormContext";

function App() {
  const [Products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : defaultProducts;
  });

  const [showFormInput, setShowFormInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(Products));
  }, [Products]);

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

        {Products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Products Found
            </h2>
            <p className="text-gray-500 mb-4">
              Start by adding a new product by clicking the "+" button above.
            </p>
          </div>
        )}

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
