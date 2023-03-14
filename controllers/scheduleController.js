import Surgery from '../models/surgery_model.js';
import SurgeryType from '../models/surgery_types.js';
import User from '../models/user_model.js';
import {v4 as uuid} from 'uuid';
import { sendmail } from '../sendemail.js';


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


export const saveSchedule = async(data,res) =>{
    try{
        const {patient} = data;
        const {email,user_name} = await User.findByPk(patient, { attributes: ['email', 'user_name'] });
        const URLId = uuid();
        const questionarieURL = `http://localhost:3000/medical-questionaries/${URLId}`;
        const subject = "Medical History Questionarie and Consent Form";
        const html = `
        Hi, ${user_name} <br/>
        <strong>Please Fill the Patient-Opt Form to confirm your surgery</strong><br/>
        <p>All data will be confidential and protected from unauthorized party</p>
        <a href = ${questionarieURL}>${questionarieURL}</a><br/>
        <br/>
        If any queries please reply this email. Thankyou.<br/>

        Regards,<br/>
        Time Doctor
        `;
        const response = await Surgery.create(data);
        sendmail(email,subject,html);
        return response;
    }
    catch(e){
        console.log(e);
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