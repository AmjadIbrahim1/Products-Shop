import ProductCard from "./components/ProductCard";
import { useState } from "react";
import { products } from "./data/data";
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import { showFormInputContext } from "./contexts/FormContext";

function App() {
  let [Products, setProducts] = useState(products);
  let [showFormInput, setShowFormInput] = useState(false);

  let productListMarkup = Products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <showFormInputContext.Provider value={{ showFormInput, setShowFormInput }}>
      <div>
        {showFormInput && <FormInput />}
        <Header />
        <div className="w-full flex justify-center">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {productListMarkup}
          </div>
        </div>
      </div>
    </showFormInputContext.Provider>
  );
}

export default App;
