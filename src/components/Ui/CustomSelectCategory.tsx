import { useState } from "react";
import { categories, type CategoryType } from "../../data/categories";
interface Props {
  value: CategoryType;
  onChange: (value: CategoryType) => void;
}
export default function CustomSelectCategory({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label className="text-sm font-medium text-amber-900">Category</label>

      <div
        onClick={() => setOpen(!open)}
        className="
          border border-amber-300 rounded-lg p-2 w-full bg-white 
          text-amber-800 cursor-pointer select-none
          outline-none transition-all duration-200
          hover:border-amber-400
          focus-within:ring-2 focus-within:ring-amber-400
          flex justify-between items-center
        "
      >
        <span>{value || "Select Category"}</span>

        <span
          className={`text-amber-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {open && (
        <div
          className="
            absolute z-20 top-full left-0 right-0 mt-1 bg-white border 
            border-amber-200 rounded-lg shadow-md overflow-hidden
            animate-[fadeSlide_0.18s_ease-out]
          "
        >
          {categories.map((category) => (
            <p
              key={category}
              onClick={() => {
                onChange(category);
                setOpen(false);
              }}
              className="
                p-2 text-amber-800 cursor-pointer hover:bg-amber-100 
                transition select-none
              "
            >
              {category}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
