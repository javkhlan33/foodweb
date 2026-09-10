import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user-model.js";

export const createUser = async (req, res) => {
  try {
    const { email, password, phoneNumber, address, role, orderedFoods } =
      req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
      orderedFoods,
    });

    const user = {
      _id: newUser._id,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      address: newUser.address,
      role: newUser.role,
    };

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "jwtsecret",
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      message: "Account uusgeh ued aldaa garlaa",
    });
  }
};
