import Button from "./Ui/Button";

export default function Header() {
  return (
    <header className="w-full flex justify-center pt-4 mb-8">
      <div className="w-full max-w-6xl bg-amber-100/60 backdrop-blur-sm border border-amber-200 shadow-md rounded-xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-amber-900 drop-shadow-sm">
          Products-Shop
        </h1>

        <Button design="bg-amber-600 hover:bg-amber-700 flex items-center gap-2 px-5 font-semibold shadow active:scale-95">
          <span className="text-lg">+</span>
          New Product
        </Button>
      </div>
    </header>
  );
}
