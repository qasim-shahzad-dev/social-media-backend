import jwt from "jsonwebtoken";


export const generateToken = (userId:string) => {
    if(!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }   
    const token = jwt.sign(
           { userId},
      process.env.JWT_SECRET as string, 
      {
        expiresIn: "1d",
      }
    );
    return token;
}
