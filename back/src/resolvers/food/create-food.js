import foodModel from "../../models/food-model.js";

export const createFood = async (req, res) => {
  try {
    const newFood = await foodModel.create({
      foodName: req.body.foodName,
      price: req.body.price,
      image: req.body.image,
      ingredients: req.body.ingredients,
      category: req.body.category,
    });

    res.status(200).json({
      message: "amjilttai food uuslee",
      food: newFood,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Food uusgeh uyd aldaa garlaa",
    });
  }
};
