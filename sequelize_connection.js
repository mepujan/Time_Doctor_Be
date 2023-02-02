import { Sequelize } from "sequelize";
import {config} from './configurations/config.js';


export const sequelize = new Sequelize(config.db_name, config.db_user_name, config.db_password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 8080
  });
