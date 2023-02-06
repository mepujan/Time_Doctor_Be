import dotenv from 'dotenv';

dotenv.config();

/**
 * exporting the configurations data fetching from the environment file
 * so that it can be maintained easily placing it in one place and making them
 * available from there.
 */
export const config = {
    db_host_name: process.env.Host,
    db_user_name: process.env.User,
    db_password: process.env.Password,
    db_name : process.env.DB_Name,
    sendmail_apikey: process.env.SENDGRID_API_KEY,
    twilio_auth_token:process.env.TWILIO_AUTH_TOKEN,
    twilio_account_sid : process.env.Account_sid,
    jwt_secret_key: process.env.Secret_Key

}