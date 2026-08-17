import userModel from "../../models/user-model.js";

export const deletedUser = async (req, res) => {
  const oldUser = await userModel.findByIdAndDelete(req.body.id);
  res.status(200).json({
    message: "amjilttai user  delete hiilee",
    user: oldUser,
  });
};
