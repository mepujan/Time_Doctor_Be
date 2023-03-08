import Surgery from '../models/surgery_model.js';
import SurgeryType from '../models/surgery_types.js';


export const createNewSurgeryType = async(req,res,next) =>{
    try{
        const newType = await SurgeryType.create(req.body);
        return res.status(201).json({message:"Surgery Type has added.",newType});

    }catch(e){
        next(e)
    }
}

export const getAllSurgeryTypes = async(req,res,next) =>{
    try{
        const types = await SurgeryType.findAll({});
        return res.status(200).json(types);
    }catch(e){
        next(e);
    }
}


export const saveSchedule = async(req,res,next) =>{
    try{
        const data = req.data;
        const newSchedule = await Surgery.create(data);
        return res.status(201).json({message:"Schedule Saved Successfully.",newSchedule});
    }
    catch(e){
        next(e);
    }
}

export const getScheduledData = async(req,res,next) =>{
    // returns the list of scheduled data of the logged in user.
    try{
        const {id} = req;
        const scheduledData = await Surgery.findAll({where:{patient:id}});
        return res.status(200).json(scheduledData?scheduledData:[]);
    }
    catch(err){
        next(err);
    }

}