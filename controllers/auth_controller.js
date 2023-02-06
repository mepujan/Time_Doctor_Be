import User from '../models/user_model.js';
import Role from "../models/role_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../configurations/config.js';


export const LoginController = async(req,res,next) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({where:{email:email,},include:Role});
        if(user){
            const does_password_match = await bcrypt.compare(password,user.password);
            if(does_password_match){
                user.password = null;
                const token = jwt.sign({email: user.email, id: user.id, user_name: user.user_name},config.jwt_secret_key);
                return res.status(200).json({message:"Login Successful",user: user, token: token});
            }
            else{
                return res.status(401).json({message:"Unauthorized User"});
            }
        }
        else{
            return res.status(401).json({message:"Unauthorized User"});
        }
    }catch(e){
        next(e);
    }
}