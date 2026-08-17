import FoodSection from "./_components/foodsection";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import { foods } from "./data/foods";
const appetizers = [
  {
    image: "/food1.png",
    title: "Finger food",
    description: "Description",
    price: 12.99,
  },
];

const salads = [
  {
    image: "/food2.png",
    title: "Salad",
    description: "Description",
    price: 12.99,
  },
];

const lunchFavorites = [
  {
    image: "/food3.png",
    title: "Lunch",
    description: "Description",
    price: 12.99,
  },
];
export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto w-[1440px]">
        <Hero />
        <section className=" w-[1440px] bg-[#404040] px-20 py-16">
          <FoodSection
            title="Appetizers"
            foods={foods.filter((food) => food.category === "Appetizers")}
          />

          <FoodSection
            title="Salads"
            foods={foods.filter((food) => food.category === "Salads")}
          />

          <FoodSection
            title="Lunch favorites"
            foods={foods.filter((food) => food.category === "Lunch favorites")}
          />
          <FoodSection
            title="Salads2"
            foods={foods.filter((food) => food.category === "Salads2")}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
