import Button from "./Ui/Button";
import slicer from "../utils/slicer";
import { useState, useContext } from "react";
import { showFormInputContext } from "../contexts/FormContext";
import type { ProductType } from "../types/ProductType";
import RemovePopup from "./RemovePopup";

interface Iprops {
  product: ProductType;
}

export default function ProductCard({ product }: Iprops) {
  let [isSlice, setIsSlice] = useState(false);
  let [showRemove, setShowRemove] = useState(false); // ✅ New state

  let { id, title, price, description, image, colors, category } = product;

  const { setShowFormInput, setIsEdit, setEditProductId } =
    useContext(showFormInputContext);

  function handleEdit() {
    setIsEdit(true);
    setEditProductId(product.id);
    setShowFormInput(true);
  }

  function handleRemove() {
    setShowRemove(true);
  }

  return (
    <>
      {/* ✅ Popup displayed conditionally */}
      {showRemove && (
        <RemovePopup Pid={id} open={true} setShowRemove={setShowRemove} />
      )}

      <div className="w-80 bg-amber-50 rounded-2xl shadow-lg overflow-hidden p-5 flex flex-col gap-4 border border-amber-200">
        <img
          src={image}
          alt="Product Image"
          className="w-full h-48 object-cover rounded-xl border border-amber-200"
        />

        <h3 className="text-xl font-semibold text-amber-900">{title}</h3>

        <p
          onClick={() => setIsSlice(!isSlice)}
          className="text-base text-amber-700/90 leading-relaxed cursor-pointer"
        >
          {slicer(description, isSlice)}
        </p>

        {/* Colors */}
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-amber-800">Colors:</span>

          {colors?.map((color, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded-full border border-amber-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-amber-900">
            Price: {price}
          </span>

          <div className="flex items-center gap-2 text-amber-700 text-sm">
            <img
              src={image}
              alt="Edit Icon"
              className="w-9 h-9 rounded-full bg-amber-200 p-1 border border-amber-300"
            />
            <span className="text-base">{category}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            doEvent={handleEdit}
            design="bg-amber-500 hover:bg-amber-600 flex-1 px-4"
          >
            Edit
          </Button>

          <Button
            doEvent={handleRemove}
            design="bg-amber-600 hover:bg-amber-700 flex-1 px-4"
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}
