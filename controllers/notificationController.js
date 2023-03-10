import User from '../models/user_model.js';
import { sendmail } from '../sendemail.js';
import { sendSMS } from '../sendSMS.js';


export const sendNotificationAsRole = async(req,res,next) =>{
    /** send email and sms notification to user as per the roles defined in url params */
    try{
        const {subject,message,role} = req.body;
        const userEmails = [];
        const userMobile = [];
        const users = await User.findAll({
                                            where:{role_id:role},
                                            attributes:['email','mobile_number']
                                        });
        if(users){
            users.map(user => {
                userEmails.push(user.email);
                userMobile.push(user.mobile_number);
            });        
            sendmail(userEmails,subject,message);
            sendSMS(userMobile,`${subject} 
             ${message}`)
        }
        return res.status(200).json({"success":"Notification Send Successfully"});
    }catch(err){
        next(err);
    }
}