import express from 'express';
import router from './routes/role_router.js';
import user_router from './routes/user_router.js';
import auth_router from './routes/auth_router.js';
import scheduleRouter from './routes/scheduleRouter.js';
import calendarRoute from './routes/calendarRoute.js';
import questionariesRoute from './routes/questionariesRoute.js';
import roomRoute from './routes/room_router.js';
import { ErrorHandler } from './middlewares/error_handler.js';
import { config } from './configurations/config.js';
import { sequelize } from './sequelize_connection.js';
import cors from 'cors';
import notificationRouter from './routes/notificationRouter.js';

const app = express();
app.use(cors());
const PORT = config.port;
process.env.TZ = "America/Toronto";

app.use('/images', express.static('images'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(user_router);
app.use(auth_router);
app.use(notificationRouter);
app.use(scheduleRouter);
app.use(calendarRoute);
app.use(questionariesRoute);
app.use(roomRoute);
app.use(ErrorHandler);

const Start = async () => {
    try {
        // creating connection
        sequelize.authenticate();
        app.listen(PORT, () => {
            console.log(`Successfully Connected to Database ${config.db_name}.`);
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (error) {
        //displaying the error for debug.
        console.log(error);
        console.log("Failed To Connect to Database. Server is not running");
    }

}

Start();