import User from '../models/user_model.js';
import { sendmail } from '../sendemail.js';
import { sendSMS } from '../sendSMS.js';


export const sendNotificationAsRole = async(req,res,next) =>{
    /** send email and sms notification to user as per the roles defined in url params */
    try{
        const {role} = req.params;
<<<<<<< HEAD
        const {subject,message} = req.body;
=======
>>>>>>> 4f9b461c4d1be0bd625929841beb6fc7916384c0
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
<<<<<<< HEAD
            });        
            sendmail(userEmails,subject,message);
            sendSMS(userMobile,`${subject} 
             ${message}`)
=======
            });
            console.log(userEmails);
            console.log(userMobile);
            sendmail(userEmails,"Testing","test");
            sendSMS(userMobile,"test")
>>>>>>> 4f9b461c4d1be0bd625929841beb6fc7916384c0
        }
        return res.status(200).json(users);
    }catch(err){
        next(err);
    }
}