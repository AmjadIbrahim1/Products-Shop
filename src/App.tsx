import ProductCard from "./components/ProductCard";
import { useState } from "react";
import { products } from "./data/data";
function App() {
  let [Products, setProducts] = useState(products);
  let productListMarkup = Products.map((product) => (
    <ProductCard
      key={product.id}
      title={product.title}
      price={product.price}
      description={product.description}
      image={product.image}
      colors={product.colors}
      category={product.category}
    />
  ));
  return (
    <div className="w-full flex justify-center">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {productListMarkup}
      </div>
    </div>
  );
}

export default App;
