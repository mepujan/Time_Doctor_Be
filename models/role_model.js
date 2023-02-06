import { Model,DataTypes} from "sequelize";
import { sequelize } from "../sequelize_connection.js";

// defining the table name and columns name of database using sequelize
class Role extends Model{}
export default Role.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'role'
  });
  Role.sync();
