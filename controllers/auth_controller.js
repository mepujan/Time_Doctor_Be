import User from '../models/user_model.js';
import Role from "../models/role_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../configurations/config.js';


export const LoginController = async(req,res,next) =>{
    /**
     * Takes email and password in request body and find the data using findOne query 
     * provided by sequelize, if there is user
     * Again check if provided password is correct or not using bcrypt compare function
     * if password is validated, authorization is provided otherwise unauthorized message
     * is sent to
     */
    try{
        const {username,password} = req.body;
        const user = await User.findOne({
            where:{user_name:username},
            attributes:{exclude:['role_id','roleId','createdAt','updatedAt']},
            include:{model:Role,attributes:['name']}});
        if(user){
            const does_password_match = await bcrypt.compare(password,user.password);
            if(does_password_match){
                user.password = null;
                const token = jwt.sign({email: user.email, id: user.id, user_name: user.user_name,mobile : user.mobile_number},config.jwt_secret_key);
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