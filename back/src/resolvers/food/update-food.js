import foodModel from "../../models/food-model.js";

export const updateFood = async (req, res) => {
  console.log(req.body);

  try {
    const updatedFood = await foodModel.findByIdAndUpdate(
      req.body.id,
      {
        foodName: req.body.foodName,
        price: req.body.price,
        image: req.body.image,
        ingredients: req.body.ingredients,
        category: req.body.category,
      },
      { new: true },
    );
    if (!updatedFood) {
      return res.status(404).json({
        message: "Food олдсонгүй",
      });
    }
    res.status(200).json({
      message: "amjilttai food  update hiilee",
      food: updatedFood,
    });
  } catch (error) {
    res.status(500).json({
      message: "food update hiihed aldaa garlaa",
    });
  }
};
