import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

//resgiter

interface IUserRequest {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export const signup = async (req: IUserRequest, res: any) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!username)
      return res
        .status(400)
        .json({ message: "Username is required", status: 400, success: false });
    if (!email)
      return res
        .status(400)
        .json({ message: "Email is required", status: 400, success: false });
    if (!password)
      return res
        .status(400)
        .json({ message: "Password is required", status: 400, success: false });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exist", status: 400, success: false });

    const newUser = new User({ username, email, password });
    await newUser.save();
    res
      .status(201)
      .json({
        message: "User created successfuly ",
        status: 201,
        sucess: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: 500, success: false });
  }
};

//login

export const login = async (req: IUserRequest, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({
          message: "Provide email please !",
          status: 400,
          success: false,
        });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "invalid Credential", status: 400, success: false });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .json({
        token,
        userId: user._id,
        username: user.username,
        message: "Successfully loged in",
        status: 200,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: 500, success: false });
  }
};
