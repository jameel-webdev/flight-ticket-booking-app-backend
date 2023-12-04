import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Issue With Assiging JWT`);
  }
};
