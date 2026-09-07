import Image from "next/image";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
};

type Props = {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: string) => void;
};

export default function AdminFoodCard({ food, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* IMAGE */}
      <div className="relative h-[160px]">
        <Image
          src={food.image}
          alt={food.foodName}
          fill
          className="object-cover"
        />

        {/* EDIT BUTTON */}
        <button
          type="button"
          onClick={() => onEdit(food)}
          className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#FD543F] shadow"
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

        {/* DELETE BUTTON */}
        <button
          type="button"
          onClick={() => onDelete(food._id)}
          className="mt-3 w-full rounded-lg border border-red-200 py-2 text-xs text-red-500 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
