import foodModel from "../../models/food-model.js";

export const deletedFood = async (req, res) => {
  const oldFood = await foodModel.findByIdAndDelete(req.body.id);
  res.status(200).json({
    message: "amjilttai food delete hiilee",
    food: oldFood,
  });
};
