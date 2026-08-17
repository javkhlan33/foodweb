import orderModel from "../../models/order-model.js";

export const createOrder = async (req, res) => {
  const body = req.body;
  const newOrder = await orderModel.create({
    user: body.user,
    totalprice: body.totalprice,
    foodOrderItems: body.foodOrderItems,
    status: body.status,
  });
  res.status(200).json({
    message: "amjilttai orderuuslee",
    order: newOrder,
  });
};
