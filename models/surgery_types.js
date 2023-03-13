import { Model,DataTypes } from "sequelize";
import { sequelize } from "../sequelize_connection.js";
import surgery_model from "./surgery_model.js";


class SurgeryType extends Model{};
export default SurgeryType.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'surgeryTypes'
});
SurgeryType.hasOne(surgery_model); // foreign key added to surgery_model table
SurgeryType.sync();


