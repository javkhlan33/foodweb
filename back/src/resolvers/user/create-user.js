import userModel from "../../models/user-model.js";

export const createUser = async (req, res) => {
  const body = req.body;
  const newUser = await userModel.create({
    email: body.email,
    password: body.password,
    phoneNumber: body.phoneNumber,
    address: body.address,
    role: body.role,
    orderedFoods: body.orderedFoods,
  });
  res.status(200).json({
    message: "amjilttai account uuslee",
    user: newUser,
  });
};
