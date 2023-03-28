import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize_connection.js";
import surgeryTypes from "./surgery_types.js";
import User from './user_model.js';
import surgeryRoom from './room_model.js';


// defining the table name and columns name of database using sequelize
class Surgery extends Model { }
export default Surgery.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patient: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        },
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    doctor: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        },
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'surgery'
});
Surgery.belongsTo(User);
Surgery.belongsTo(surgeryTypes)
Surgery.belongsTo(surgeryRoom)
Surgery.sync();
