import foodModel from "../../models/food-model.js";

export const getFood = async (req, res) => {
  const food = await foodModel.find().populate("category");

  res.status(200).json(food);
};
