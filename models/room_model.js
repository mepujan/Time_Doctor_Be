import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../sequelize_connection.js";
import Surgery from './surgery_model';

class SurgeryRoom extends Model { }

export default SurgeryRoom.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        number: {
            type: String,
            allowNull: false
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'surgeryRoom'
}
);
SurgeryRoom.hasOne(Surgery);
SurgeryRoom.sync();