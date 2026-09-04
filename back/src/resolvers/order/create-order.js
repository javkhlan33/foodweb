import orderModel from "../../models/order-model.js";

export const createOrder = async (req, res) => {
  try {
    const { user, totalprice, foodOrderItems, status, address } = req.body;

    if (!user || !foodOrderItems?.length) {
      return res.status(400).json({
        message: "user болон foodOrderItems хэрэгтэй",
      });
    }

    const newOrder = await orderModel.create({
      user,
      totalprice,
      foodOrderItems,
      status,
      address,
    });

    const order = await orderModel
      .findById(newOrder._id)
      .populate(["user", "foodOrderItems.foodId"]);

    res.status(200).json({
      message: "amjilttai orderuuslee",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Order үүсгэхэд алдаа гарлаа" });
  }
};
