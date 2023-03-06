import Surgery from '../models/surgery_model.js';


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