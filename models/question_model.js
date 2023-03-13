import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize_connection.js";
import questionType from "./questionType_model.js";

class Question extends Model{}
export default Question.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    question:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'question'
  });
  Question.belongsTo(questionType);
  Question.sync();