import orderModel from "../../models/order-model.js";

export const updateOrder = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        message: "id болон status хэрэгтэй",
      });
    }

    if (!["PENDING", "DELIVERED", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        message: "Буруу status",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order олдсонгүй",
      });
    }

    res.status(200).json({
      message: "Order status амжилттай шинэчлэгдлээ",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Order update error:", error);

    res.status(500).json({
      message: "Order update хийхэд алдаа гарлаа",
    });
  }
};
