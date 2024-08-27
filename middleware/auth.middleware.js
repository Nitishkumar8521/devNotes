import jwt from "jsonwebtoken";
import { UserModel } from "../model/user.model.js";

const auth=async (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({message:"Token not found"});
    }
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Token not found"});
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({message: "Invalid Token please login again"});
        }
        const user = await UserModel.findById(decoded.id);
        req.user=user;
        next()
    } catch (error) {
        res.status(401).json({message:"Invalid Token"});
    }
}

export default auth;