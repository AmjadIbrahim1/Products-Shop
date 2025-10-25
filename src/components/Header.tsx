
export default function Header() {
  return (
    <header className="w-full flex justify-center pt-4 mb-8">
      <div className="w-full max-w-6xl bg-amber-100/60 backdrop-blur-sm border border-amber-200 shadow-md rounded-xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-amber-900 drop-shadow-sm">
          Products-Shop
        </h1>

        <button className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 text-white font-semibold shadow hover:shadow-lg hover:bg-amber-700 active:scale-95 transition-all">
          <span className="text-lg">+</span>
          New Product
        </button>
      </div>
    </header>
  );
}
