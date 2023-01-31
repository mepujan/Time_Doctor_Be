import dotenv from 'dotenv';

dotenv.config();

export const config = {
    db_host_name: process.env.Host,
    db_user_name: process.env.User,
    db_password: process.env.Password,
    db_name : process.env.DB_Name
}