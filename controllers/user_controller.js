import User from '../models/user_model.js';
import { sendmail } from '../sendemail.js';
import { sendSMS } from '../sendSMS.js';


export const createUser = async(req,res,next) =>{
    try{
        const user = await User.create(req.body);
        return res.status(201).json({"message":"User Information Saved.",user});

    }catch(e){
        next(e);
    }
}

export const updateUser = async(req,res,next) => {
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

