import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize_connection.js";
import Question from "./question_model.js";
import User from './user_model.js';

class Answer extends Model{}
export default Answer.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    answer:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'answer'
  });
Answer.belongsTo(Question)
Answer.belongsTo(User)
Answer.sync();