import userModel from "../../models/user-model.js";

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.body.id,
      {
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        role: req.body.role,
        orderedFoods: req.body.orderedFoods,
      },
      { new: true },
    );
    res.status(200).json({
      message: "amjilttai user  update hiilee",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "user update hiihed aldaa garlaa",
    });
  }
};
