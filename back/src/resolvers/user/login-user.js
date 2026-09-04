import userModel from "../../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,email: user.email, role: user.role
      },
      process.env.JWT_SECRET || "jwtsecret",
      {
        expiresIn: "7d",
      },
    );
    user.password = undefined;
    res.json({ message: "Амжилттай нэвтэрлээ!", token, user })
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login hiihed aldaa garlaa" });
  }
};