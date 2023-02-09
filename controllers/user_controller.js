import User from '../models/user_model.js';
import { sendmail } from '../sendemail.js';
import { sendSMS } from '../sendSMS.js';
import { config } from '../configurations/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';


export const createUser = async(req,res,next) =>{
    /**
     * new user creating method that takes user information
     * save the password in a variable, hash it and append to the json 
     * and then save the data to the database
     * token is created using jwt using secret key
     */
    try{
        const {password} = req.body;
        const user = User.build(req.body);
        const hash_password = await bcrypt.hash(password,10);
        user.password = hash_password;
        user.profile_image = path.join(config.host,req.file.path);
        const result = await user.save();
        const token = jwt.sign({email: result.email, id: result.id, username: result.user_name},config.jwt_secret_key);
        return res.status(201).json({"message":"User Account Created Successfully.",result,token});

    }catch(e){
        next(e);
    }
}

export const updateUser = async(req,res,next) => {
    /**
     * Update the information to the user
     * if data is updated successfully, it will call sendmail() and sendSMS() method
     * to notify the user about the change has been done.
     */
    try {        
        const updatedUser = await User.update({first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name, email: req.body.email, user_name: req.body.user_name, mobile_number: req.body.mobile_number, address: req.body.address, dob: req.body.dob, gender: req.body.gender, blood_group: req.body.blood_group, role_id: req.body.rold_id},{where:{id: req.params.id}});
        const {email,mobile_number} = req.body;
        if(updatedUser > 0){
            sendmail(email);
            sendSMS(mobile_number);
        }
       
        return res.status(200).json({"message":"User Account is Updated"});
    } catch(e) {
        next(e);
    }
}



export const updatePassword = async(req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            let user = jwt.verify(token,config.jwt_secret_key);
            const {id} = user;
            const {password} = req.body;
            const newHashPassword = await bcrypt.hash(password,10);
            const updatedPassword = await User.update({password:newHashPassword},{where:{id:id}});
            if(updatedPassword){
                return res.status(201).json({"message":"Password Updated Successfully."});
            }
            else{
                return res.status(500).json({"message":"Cannot Update Password."});
            }

        }else{
            return res.status(401).json({"message":"Unauthorized User"});
        }

    }catch(e){
        next(e);
    }

}