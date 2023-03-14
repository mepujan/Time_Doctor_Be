import jwt from 'jsonwebtoken';
import { config } from '../configurations/config.js';


export const LoginRequired = async(req,res, next) => {
        try{
            let token = req.headers.authorization;
            if(token){
                token = token.split(' ')[1];
                let user = jwt.verify(token,config.jwt_secret_key);
                req.id = user.id;
                req.email = user.email;
                req.mobile = user.mobile;
                req.user_name = user.user_name;
            }else{
                return res.status(401).json({message:"Unauthorized User"});
            }
            next();
    
        }catch(error){
            res.status(401).json({message:"Unauthorized User"});
        }
}