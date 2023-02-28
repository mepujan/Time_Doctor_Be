


export const getScheduledData = async(req,res,next) =>{
    // returns the list of scheduled data of the logged in user.
    try{
        const {id} = req;
        const scheduledData = await Schedule.findByPk(id);
        return res.status(200).json(scheduledData?scheduledData:[]);
    }
    catch(err){
        next(err);
    }

}