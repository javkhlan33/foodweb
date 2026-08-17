import mongoose from "mongoose";
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const UserSchema = new schema({
  id: ObjectId,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  orderedFoods: String,

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
export default mongoose.model("User", UserSchema);
