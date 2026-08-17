import orderModel from "../../models/order-model.js";

export const getOrders = async (req, res) => {
  const orders = await orderModel
    .find()
    .populate(["user", "foodOrderItems.foodId"]);

  res.status(200).json(orders);
};
