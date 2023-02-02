// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'ACf5a45f0652eb255be61c8aac64fedf39';
const authToken = '0cfdf4f70d426a7fedcf6080492839f7';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Updates has been made to your timedoctor app',
     from: '+14308031725',
     to: '+6476853679'
   })
  .then(message => console.log(message.sid));
