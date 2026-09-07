import AdminFoodCard from "./adminfoodcard";

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

type FoodSectionProps = {
  title: string;
  foods: Food[];
  loading: boolean;
  onAddFood: () => void;
  onEditFood: (food: Food) => void;
  onDeleteFood: (id: string) => void;
};

export default function FoodSection({
  title,
  foods,
  loading,
  onAddFood,
  onEditFood,
  onDeleteFood,
}: FoodSectionProps) {
  if (loading) {
    return (
      <section className="rounded-2xl bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">{title} (0)</h2>

        <div className="grid grid-cols-4 gap-3">
          <div className="h-[220px] animate-pulse rounded-xl bg-gray-100" />
          <div className="h-[220px] animate-pulse rounded-xl bg-gray-100" />
          <div className="h-[220px] animate-pulse rounded-xl bg-gray-100" />
          <div className="h-[220px] animate-pulse rounded-xl bg-gray-100" />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-5">
      {/* TITLE */}
      <h2 className="mb-4 text-lg font-semibold text-[#171717]">
        {title} ({foods.length})
      </h2>

      {/* PRODUCTS */}
      <div className="grid grid-cols-4 gap-3">
        {/* ADD NEW DISH */}
        <button
          type="button"
          onClick={onAddFood}
          className="flex h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#FD543F] bg-white transition hover:bg-[#FFF8F6]"
        >
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FD543F] text-2xl font-light text-white">
            +
          </span>

          <span className="text-xs font-medium text-[#171717]">
            Add new Dish to
          </span>

          <span className="text-xs font-medium text-[#171717]">{title}</span>
        </button>

        {/* FOOD CARDS */}
        {foods.map((food) => (
          <AdminFoodCard
            key={food._id}
            food={food}
            onEdit={() => onEditFood(food)}
            onDelete={() => onDeleteFood(food._id)}
          />
        ))}
      </div>
    </section>
  );
}
