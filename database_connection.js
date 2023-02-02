import mysql from 'mysql2/promise.js';
import {config} from './configurations/config.js';

const Connection = await mysql.createConnection({
    host: config.db_host_name,
    user: config.db_user_name,
    password: config.db_password,
});

export default  Connection;