import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../sequelize_connection.js";

class SurgeryRoom extends Model { }

export default SurgeryRoom.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'surgeryRoom'
}
);
SurgeryRoom.sync();