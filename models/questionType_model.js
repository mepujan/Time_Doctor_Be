import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize_connection.js";

class QuestionType extends Model{}
export default QuestionType.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'questionType'
  });

  QuestionType.sync();