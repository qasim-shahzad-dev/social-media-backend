import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
    userId?: string,
}
export const getCurrentUser  = async ( req:AuthRequest, res:any) => {

    try {
    const user =    

    } catch (error) {
        
    }

}