import Role from '../models/role_model.js';


export const createRole = async(req,res,next) =>{
    /** 
     * create the role of the user
     */
    try{
    const role= await Role.create(req.body);
    return res.status(201).json({'success':"Role Created Successfully",role});
    }catch(e){
        next(e);
    }
}


export const getRole = async(req,res,next) =>{
    try{
        const roles = await Role.findAll({attributes:{exclude:['createdAt','updatedAt']},});
        return res.status(201).json(roles);
    }catch(e){
        next(e);
    }
}