import { config } from "./configurations/config.js";
const accountSid = config.twilio_account_sid;
const authToken = config.twilio_auth_token;
import twilio from 'twilio';

const client = twilio(accountSid,authToken);

export const sendSMS = (mobile_num) =>{
    client.messages
    .create({ body: "Your Time Doctor Account has been Updated.", from: "+13856449138", to: mobile_num })
    .then(message => console.log(message.sid));
}

