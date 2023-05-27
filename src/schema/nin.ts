
import { Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface INin {
    idempotency_ref: string;
    data_type: string;
    nin: string;
  
}

export class NinInstance extends Model<INin> {
    declare idempotency_ref: string;
    declare data_type:string;
    declare nin: string;
}
NinInstance.init(
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
        nin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'NIN is required'
                },
                notEmpty:{
                    msg: 'NIN is required'
                }
            }
        }
    
    },
    {
        sequelize: connectDB(),
        tableName: 'nin'
    }
)

NinInstance.sync()