import foodModel from "../../models/food-model.js";

export const deletedFood = async (req, res) => {
  try {
    const deletedFood = await foodModel.findByIdAndDelete(req.body.id);

    if (!deletedFood) {
      return res.status(404).json({
        message: "Food олдсонгүй",
      });
    }

    res.status(200).json({
      message: "Food амжилттай устгагдлаа",
      food: deletedFood,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Food delete хийхэд алдаа гарлаа",
    });
  }
};
