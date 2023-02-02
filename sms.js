import { config } from './configurations/config.js';

export const sendText = (phonenum) => {
var twilio = require('twilio');
var TWILIO_ACCOUNT_SID = 'ACf5a45f0652eb255be61c8aac64fedf39',
    TWILIO_AUTH_TOKEN = '0cfdf4f70d426a7fedcf6080492839f7',
    TWILIO_PHONE_NUMBER = '+14308031725';

    var client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    client.messages.create({
        to: phonenum,
        from: TWILIO_PHONE_NUMBER,
        body: 'Good luck on your Twilio quest!'
      }).then(function(message) {
        // When we get a response from Twilio, respond to the HTTP POST request
        res.send('Message is inbound!');
      });

      
}





