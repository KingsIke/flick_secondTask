
import { Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface IPhone {
    idempotency_ref: string;
    data_type: string;
    phone: string;
  
}

export class PhoneInstance extends Model<IPhone> {
    declare idempotency_ref: string;
    declare data_type:string;
    declare phone: string;
}
PhoneInstance.init(
    {
        idempotency_ref: {
            type: DataTypes.UUID,
        primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
        },
        data_type:{
            type: DataTypes.STRING,
            allowNull: false,
        
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'Phone is required'
                },
                notEmpty:{
                    msg: 'Phone is required'
                }
            }
        }
    
    },
    {
        sequelize: connectDB(),
        tableName: 'phone'
    }
)

PhoneInstance.sync()