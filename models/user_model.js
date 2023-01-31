import { Model,DataTypes} from "sequelize";
import { sequelize } from "../sequelize_connection.js";
import Role from './role_model.js';

class User extends Model{}
export default User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    middle_name:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: {
              msg: "Must be a valid email address",
            }
          }
    },
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    mobile_number:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },   
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"roles",
            key:"id"
        }
    },
    dob:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    blood_group:{
        type:DataTypes.CHAR(5),
        allowNull:false
    },
    profile_image:{
        type:DataTypes.STRING,
        allowNull: true
    }
    
},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
  });
User.belongsTo(Role);
User.sync();
