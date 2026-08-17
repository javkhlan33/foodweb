import orderModel from "../../models/order-model.js";

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
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
    res.status(200).json({
      message: "amjilttai order  update hiilee",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "order update hiihed aldaa garlaa",
    });
  }
};
