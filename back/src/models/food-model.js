import mongoose from "mongoose";
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const FoodSchema = new schema({
  id: ObjectId,
  foodName: String,
  price: Number,
  image: String,
  ingredients: String,
  category: {
    type: ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export default mongoose.model("Food", FoodSchema);
