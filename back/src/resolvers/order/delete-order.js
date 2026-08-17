import orderModel from "../../models/order-model.js";

export const deletedOrder = async (req, res) => {
  const oldOrder = await orderModel.findByIdAndDelete(req.body.id);
  res.status(200).json({
    message: "amjilttai order  delete hiilee",
    order: oldOrder,
  });
};
