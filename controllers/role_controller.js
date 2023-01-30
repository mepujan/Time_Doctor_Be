import Role from '../models/role_model.js';


export const createRole = async(req,res,next) =>{
    try{
    const role= await Role.create(req.body);
    return res.status(201).json({'success':"Role Created Successfully",role});
    }catch(e){
        next(e);
    }
}