import express from 'express';
import Connection from './database_connection.js';
import router from './routes/role_router.js';
import user_router from './routes/user_router.js';
import { ErrorHandler } from './middlewares/error_handler.js';
import { config } from './configurations/config.js';
import { sendmail } from './sendemail.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
app.use(user_router);
app.use(ErrorHandler);

const Start = async() =>{
    try{
        sendmail();
        // creating connection
       Connection.connect();

        // assigning database creating query to variable
        const db_create_query = `CREATE DATABASE IF NOT EXISTS ${config.db_name}`;

        //executing the query
        await Connection.query(db_create_query);
        app.listen(PORT,()=>{
            console.log(`Successfully Connected to Database ${config.db_name}.`);
            console.log(`Server is running on port ${PORT}`)
        });
    }catch(error){
        console.log(error);
        console.log("Failed To Connect to Database. Server is not running");
    }
    
}

Start();