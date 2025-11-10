import User from "../models/User";
import jwt from "jsonwebtoken";
import appEventEmitter from "../events/EventEmitter";
import { USER_EVENTS } from "../constants/index";
import { AddNotification } from "../queues/queue";


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
  console.log(`User ${username} created`);

  try {
    await AddNotification({
      type: 'welcome_email',
      username,
      email,
    });
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
    //Event
    appEventEmitter.emit(USER_EVENTS.CREATED, newUser);
    res
      .status(201)
      .json({
        message: "User created successfuly ",
        status: 201,
        sucess: true,
      });
  } catch (error) {
    console.error('Failed to add job to queue:', error);
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
          message: "Invalid Email!, Please Provide correct email ",
          status: 400,
          success: false,
        });

    const isMatch = user.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "invalid Credential", status: 400, success: false });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    console.log("🚀 ~ login ~ token:", token)
    appEventEmitter.emit(USER_EVENTS.CREATED, user);

    res
    res.status(200).json({
      results: {
        token: token,
      },

      message: "User logged in successfully",
      status: 200,
      success: true,
    });


  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: 500, success: false });
  }
};
