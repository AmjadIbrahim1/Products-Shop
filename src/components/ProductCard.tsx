interface Iprops {
  title: string;
  price: string;
  description: string;
  image: string;
  colors: string[];
  category: string;
}
export default function ProductCard({
  title,
  price,
  description,
  image,
  colors,
  category,
}: Iprops) {
  return (
    <div className="w-80 bg-amber-50 rounded-2xl shadow-lg overflow-hidden p-5 flex flex-col gap-4 border border-amber-200">
      <img
        src={image}
        alt="Product Image"
        className="w-full h-48 object-cover rounded-xl border border-amber-200"
      />

      <h3 className="text-xl font-semibold text-amber-900">{title}</h3>
      <p className="text-base text-amber-700/90 leading-relaxed">
        {description}
      </p>

      {/* Colors */}
      <div className="flex items-center gap-3">
        <span className="text-base font-medium text-amber-800">Colors:</span>

        {colors?.map((color, i) => (
          <span
            key={i}
            className={`w-6 h-6 rounded-full border border-amber-300`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-bold text-amber-900">Price: {price}</span>

        <div className="flex items-center gap-2 text-amber-700 text-sm">
          <img
            src={image}
            alt="Edit Icon"
            className="w-9 h-9 rounded-full bg-amber-200 p-1 border border-amber-300"
          />
          <span className="text-base">{category}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="cursor-pointer flex-1 px-4 py-2.5 text-base rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition">
          Edit
        </button>
        <button className="cursor-pointer flex-1 px-4 py-2.5 text-base rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition">
          Remove
        </button>
      </div>
    </div>
  );
}
