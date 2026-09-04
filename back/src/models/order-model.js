import mongoose from "mongoose";
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;
const foodOrderItemSchema = new schema({
  foodId: {
    type: ObjectId,
    ref: "Food",
  },
  quantity: Number,
});
const OrderSchema = new schema({
  user: {
    type: ObjectId,
    ref: "User",
  },

  totalprice: Number,

  foodOrderItems: [foodOrderItemSchema],

  status: {
    type: String,
    enum: ["PENDING", "DELIVERED", "CANCELLED"],
    default: "PENDING",
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  address: {
    type: String,
  },

  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export default mongoose.model("Order", OrderSchema);
