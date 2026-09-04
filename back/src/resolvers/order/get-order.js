import orderModel from "../../models/order-model.js";

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { user: userId } : {};

    const orders = await orderModel
      .find(filter)
      .populate(["user", "foodOrderItems.foodId"])
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Orders авахад алдаа гарлаа" });
  }
};
