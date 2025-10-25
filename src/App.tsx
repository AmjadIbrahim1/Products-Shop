import ProductCard from "./components/ProductCard";
import { useState } from "react";
import { products } from "./data/data";
import Header from "./components/Header";
function App() {
  let [Products, setProducts] = useState(products);
  let productListMarkup = Products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <div>
      <Header />
      <div className="w-full flex justify-center">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2] lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {productListMarkup}
        </div>
      </div>
    </div>
  );
}

export default App;
