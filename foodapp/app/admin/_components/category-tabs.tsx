"use client";

type Category = {
  _id: string;
  categoryName: string;
};

type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;

  category?:
    | string
    | {
        _id?: string;
        id?: string;
        categoryId?: string;
        categoryName?: string;
      };

  categoryId?: string;
  categoryName?: string;
};

type Props = {
  categories: Category[];
  foods: Food[];
  selectedCategory: string;
  onSelect: (id: string) => void;
  onAddCategory: () => void;
  getCategoryFoodCount: (id: string) => number;
};

export default function CategoryTabs({
  categories,
  foods,
  selectedCategory,
  onSelect,
  onAddCategory,
  getCategoryFoodCount,
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#171717]">
          Dishes category
        </h2>

        <button
          onClick={onAddCategory}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FD543F] text-xl text-white"
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* ALL */}
        <button
          onClick={() => onSelect("all")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
            selectedCategory === "all"
              ? "border-[#FD543F] text-[#FD543F]"
              : "border-gray-200 text-[#171717]"
          }`}
        >
          All Dishes
          <span className="rounded-full bg-black px-2 text-[10px] text-white">
            {foods.length}
          </span>
        </button>

        {/* CATEGORIES */}
        {categories.map((category) => {
          const count = getCategoryFoodCount(category._id);

          return (
            <button
              key={category._id}
              onClick={() => onSelect(category._id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === category._id
                  ? "border-[#FD543F] text-[#FD543F]"
                  : "border-gray-200 text-[#171717]"
              }`}
            >
              {category.categoryName}

              <span className="rounded-full bg-black px-2 text-[10px] text-white">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
