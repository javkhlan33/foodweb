import Image from "next/image";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId?: string;
  categoryName?: string;
};

type AdminFoodCardProps = {
  food: Food;
};

export default function AdminFoodCard({ food }: AdminFoodCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={food.image}
          alt={food.foodName}
          width={300}
          height={150}
          className="h-[150px] w-full object-cover"
        />

        {/* EDIT BUTTON */}
        <button
          type="button"
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#FD543F] shadow"
        >
          ✎
        </button>
      </div>

      {/* INFO */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-[#FD543F]">
            {food.foodName}
          </h3>

          <span className="shrink-0 text-xs font-bold text-[#171717]">
            ${Number(food.price).toFixed(2)}
          </span>
        </div>

        <p className="mt-1 line-clamp-2 text-xs leading-4 text-gray-500">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
}
