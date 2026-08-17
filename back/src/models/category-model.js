import mongoose from "mongoose";
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const CategorySchema = new schema({
  id: ObjectId,
  categoryName: String,

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
export default mongoose.model("Category", CategorySchema);
