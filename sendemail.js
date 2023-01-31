import pkg from '@sendgrid/mail';
import { config } from './configurations/config.js';

pkg.setApiKey(config.sendmail_apikey) 

export const sendmail = () => {
    const msg = {
        to: 'timalsinaanil96@gmail.com', // Change to your recipient
        from: 'mepujan10@gmail.com', // Change to your verified sender
        subject: 'Account update',
        html: '<strong>Your account is updated</strong>',
      }

pkg.send(msg)
    .then((response) => {
        console.log('SendGrid Email sent: ' + response)
    })
    .catch((error) => {
        console.error(error)
    })

}