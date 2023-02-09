import pkg from '@sendgrid/mail';
import { config } from './configurations/config.js';

pkg.setApiKey(config.sendmail_apikey) 

export const sendmail = (email,subject,message) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'timedoctor29@gmail.com', // Change to your verified sender
        subject: subject,
        html: `<strong>${message}</strong>`,
      }

pkg.send(msg)
    .then((response) => {
        console.log('SendGrid Email sent: ' + response)
    })
    .catch((error) => {
        console.error(error)
    })

}