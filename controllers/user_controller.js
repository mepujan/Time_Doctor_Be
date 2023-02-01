import User from '../models/user_model.js';


export const createUser = async(req,res,next) =>{
    try{
        const user = await User.create(req.body);
        return res.status(201).json({"message":"User Information Saved.",user});

    }catch(e){
        next(e);
    }
}


