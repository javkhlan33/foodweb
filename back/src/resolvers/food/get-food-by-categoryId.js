import foodModel from "../../models/food-model.js";
export const getFoodByCategoryId = async (req, res) => {
  const id = req.params.id;
  const food = await foodModel.find({ category: id }).populate("category");
  res.status(200).json(food);
};
