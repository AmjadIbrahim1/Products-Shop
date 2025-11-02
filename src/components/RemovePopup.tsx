import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useContext, useState } from "react";
import { showFormInputContext } from "../contexts/FormContext";

interface IProps {
  Pid: string;
  open: boolean;
  setShowRemove: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RemovePopup({ Pid, open, setShowRemove }: IProps) {
  const [isOpen, setIsOpen] = useState(open);
  const { Products, setProducts } = useContext(showFormInputContext);

  function removeProduct() {
    setProducts(Products.filter((product) => product.id !== Pid));
    setIsOpen(false);
    setShowRemove(false); 
  }

  function close() {
    setIsOpen(false);
    setShowRemove(false); 
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-red-200 text-center">
          <DialogTitle className="text-xl font-semibold text-red-700 mb-3">
            Remove Product
          </DialogTitle>

          <p className="text-gray-700 mb-6">
            Are you sure you want to remove this product?
            <br />
            This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={close}
              className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={removeProduct}
              className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-95 transition"
            >
              Remove
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
