export type Food = {
  id: number;
  category: "Appetizers" | "Salads" | "Lunch favorites" | "Salads2";
  image: string;
  title: string;
  description: string;
  price: number;
};

export const foods: Food[] = [
  // ---------------- Appetizers ----------------
  {
    id: 1,
    category: "Appetizers",
    image: "/food.png",
    title: "Finger food",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 2,
    category: "Appetizers",
    image: "/food.png",
    title: "Cranberry Brie Bites",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 3,
    category: "Appetizers",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 4,
    category: "Appetizers",
    image: "/food.png",
    title: "Brie Crostini Appetizer",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 5,
    category: "Appetizers",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 6,
    category: "Appetizers",
    image: "/food.png",
    title: "Grilled chicken",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },

  // ---------------- Salads ----------------
  {
    id: 7,
    category: "Salads",
    image: "/food.png",
    title: "Grilled Chicken Cobb Salad",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 8,
    category: "Salads",
    image: "/food.png",
    title: "Burrata Caprese",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 9,
    category: "Salads",
    image: "/food.png",
    title: "Beetroot and Orange Salad",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },

  // ---------------- Lunch favorites ----------------
  {
    id: 10,
    category: "Lunch favorites",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 11,
    category: "Lunch favorites",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 12,
    category: "Lunch favorites",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 13,
    category: "Lunch favorites",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 14,
    category: "Lunch favorites",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },

  // ---------------- Salads (2-р хэсэг) ----------------
  {
    id: 15,
    category: "Salads2",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 16,
    category: "Salads2",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
  {
    id: 17,
    category: "Salads2",
    image: "/food.png",
    title: "Sunshine Stackers",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
  },
];
