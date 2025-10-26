import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useContext, useEffect, useRef } from "react";
import { showFormInputContext } from "../contexts/FormContext";

export default function FormInput() {
  let {
    showFormInput,
    setShowFormInput,
    Products,
    setProducts,
    isEdit,
    setIsEdit,
    editProductId,
    setEditProductId,
  } = useContext(showFormInputContext);

  let titleRef = useRef<HTMLInputElement>(null);
  let descriptionRef = useRef<HTMLInputElement>(null);
  let imageRef = useRef<HTMLInputElement>(null);
  let priceRef = useRef<HTMLInputElement>(null);

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
      }
    } else {
      titleRef.current!.value = "";
      descriptionRef.current!.value = "";
      imageRef.current!.value = "";
      priceRef.current!.value = "";
    }
  }, [isEdit, editProductId]);

  function close() {
    setShowFormInput(false);
    setIsEdit(false);
    setEditProductId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formValues = {
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      image: imageRef.current!.value,
      price: priceRef.current!.value,
    };

    if (isEdit && editProductId) {
      setProducts(
        Products.map((p) =>
          p.id === editProductId ? { ...p, ...formValues } : p
        )
      );
    } else {
      setProducts([
        ...Products,
        {
          id: crypto.randomUUID(),
          ...formValues,
          colors: [],
          category: "general",
        },
      ]);
    }

    close();
  }

  return (
    <Dialog open={showFormInput} onClose={close} className="relative z-50">
      {/* خلفية */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4 py-6 overflow-y-auto">
        <DialogPanel
          className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-amber-200
          duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle className="text-2xl font-bold text-amber-900 mb-4">
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-800">
                Product Title
              </label>
              <input ref={titleRef} className={inputStyle} />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-800">
                Description
              </label>
              <input ref={descriptionRef} className={inputStyle} />
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-800">
                Image URL
              </label>
              <input ref={imageRef} className={inputStyle} />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-amber-800">
                Price
              </label>
              <input ref={priceRef} type="number" className={inputStyle} />
            </div>

            {/* Buttons */}
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
