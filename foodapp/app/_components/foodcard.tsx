"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useEffect, useState } from "react";

type foodType = {
  image: string;
  title: string;
  description: string;
  price: number;
};

interface FoodCardProps extends foodType {
  onAddToCart: () => void;
}

export default function FoodCard({
  image,
  title,
  description,
  price,
  onAddToCart,
}: FoodCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [foods, setfoods] = useState<foodType[]>([]);
  const getCategory = async () => {
    const response = await fetch("http://localhost:8000/food");
    const foodData = await response.json();
    setfoods(foodData.results);

    console.log(foodData);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-[400px]  rounded-[20px] bg-white p-4">
      {/* Image */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={365}
          height={246}
          className="h-full w-full rounded-[12px] bottom-[116px] right-4 object-cover"
        />

        <button
          className={`
            absolute
            bottom-4
            right-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            shadow-md
            ${isSelected ? "bg-[#171717]" : "bg-white"}
          `}
          onClick={() => {
            setIsSelected(!isSelected);
            onAddToCart();
          }}
        >
          {isSelected ? (
            <Check size={18} className="text-[#FD543F]" />
          ) : (
            <Plus size={18} className="text-[#FD543F]" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="mt-5 w-full flex  flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] w-full text-[#FD543F]">
            {title}
          </h3>

          <p className="text-[18px] font-bold text-[#171717]">
            ${price.toFixed(2)}
          </p>
        </div>

        <p className="text-[14px] w-full leading-5 text-[#171717]">
          {description}
        </p>
      </div>
    </div>
  );
}
