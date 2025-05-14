import { Request, Response } from "express";
import User from "../models/User";
import jwt from 'jsonwebtoken';

//resgiter

interface IUserRequest {
    body: {
        username: string;
        email: string;
        password: string;
    }
}

export const register = async (req: IUserRequest, res: any) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exist", error: 400 });
        const newUser = new User(({ username, email, password }));
        await newUser.save();
        res.status(201).json({ message: "User registered successfuly " });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: 500 });
    }
};

//login



export const login = async (req: IUserRequest, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "invalid credential " })

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "invalid Credential" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        })
        res.status(200).json({ token, userId: user._id, username: user.username });


    } catch (error) {

        res.status(500).json({ message: "Internal server error", error: 500 })
    }
}