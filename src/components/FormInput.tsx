import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { showFormInputContext } from "../contexts/FormContext";
import isValid from "../utils/validation";
import type { ProductFormValues } from "../utils/validation";

import { categories } from "../data/categories";
import ColorsSelect from "./Ui/ColorsSelect";
import type { ProductType } from "../types/ProductType";

export default function FormInput() {
  const [check, setCheck] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  const [category, setCategory] = useState<string>("General");
  const [open, setOpen] = useState(false); 
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const {
    showFormInput,
    setShowFormInput,
    Products,
    setProducts,
    isEdit,
    setIsEdit,
    editProductId,
    setEditProductId,
  } = useContext(showFormInputContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const inputStyle =
    "border border-amber-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none w-full placeholder:text-amber-400/60";

  useEffect(() => {
    if (isEdit && editProductId) {
      const productToEdit = Products.find((p) => p.id === editProductId);
      if (productToEdit) {
        titleRef.current!.value = productToEdit.title;
        descriptionRef.current!.value = productToEdit.description;
        imageRef.current!.value = productToEdit.image;
        priceRef.current!.value = productToEdit.price;
        setCategory(productToEdit.category ?? "General");
        setSelectedColors(productToEdit.colors ?? []);
      }
    } else {
      if (titleRef.current) titleRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
      if (imageRef.current) imageRef.current.value = "";
      if (priceRef.current) priceRef.current.value = "";

      setCategory("General");
      setSelectedColors([]);
      setCheck({ title: "", description: "", image: "", price: "" });
    }
  }, [isEdit, editProductId, Products]);

  function close() {
    setShowFormInput(false);
    setIsEdit(false);
    setEditProductId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formValues: ProductFormValues = {
      title: titleRef.current!.value.trim(),
      description: descriptionRef.current!.value.trim(),
      image: imageRef.current!.value.trim(),
      price: priceRef.current!.value.trim(),
      colors: selectedColors,
      category,
    };

    const validationResult = isValid(formValues);
    setCheck(validationResult.errors);
    if (!validationResult.ok) return;

    if (isEdit && editProductId) {
      setProducts(
        Products.map((p) =>
          p.id === editProductId ? ({ ...p, ...formValues } as ProductType) : p
        )
      );
    } else {
      const newProduct: ProductType = {
        id: crypto.randomUUID(),
        title: formValues.title,
        description: formValues.description,
        image: formValues.image,
        price: formValues.price,
        colors: formValues.colors ?? [],
        category: formValues.category ?? "General",
      };
      setProducts([...Products, newProduct]);
    }

    close();
  }

  return (
    <Dialog open={showFormInput} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4 py-6 overflow-y-auto">
        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-amber-200">
          <DialogTitle className="text-2xl font-bold text-amber-900 mb-4">
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-900">
                Title
              </label>
              <input
                ref={titleRef}
                className={inputStyle}
                placeholder="Enter product title"
              />
              <p className="text-red-600 text-sm">{check.title}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-900">
                Description
              </label>
              <input
                ref={descriptionRef}
                className={inputStyle}
                placeholder="Enter product description"
              />
              <p className="text-red-600 text-sm">{check.description}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-900">
                Image URL
              </label>
              <input
                ref={imageRef}
                className={inputStyle}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-red-600 text-sm">{check.image}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-900">
                Price
              </label>
              <input
                ref={priceRef}
                type="number"
                className={inputStyle}
                placeholder="Enter product price"
              />
              <p className="text-red-600 text-sm">{check.price}</p>
            </div>

            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-medium text-amber-900">
                Category
              </label>
              <div
                onClick={() => setOpen((s) => !s)}
                className="border border-amber-300 rounded-lg p-2 w-full bg-white text-amber-800 cursor-pointer flex justify-between items-center hover:border-amber-400 transition"
              >
                <span>{category}</span>
                <span
                  className={`text-amber-600 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {open && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-amber-200 rounded-lg shadow-md animate-[fadeSlide_0.18s_ease-out]">
                  {categories.map((c) => (
                    <p
                      key={c}
                      onClick={() => {
                        setCategory(c);
                        setOpen(false);
                      }}
                      className="p-2 text-amber-800 cursor-pointer hover:bg-amber-100 transition"
                    >
                      {c}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <ColorsSelect
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />

            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                onClick={close}
                className="cursor-pointer px-4 py-2 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 active:scale-95 transition"
              >
                {isEdit ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
