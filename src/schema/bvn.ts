
import { Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface IBvn {
    idempotency_ref: string;
    data_type: string;
    bvn: string;
  
}

export class BvnInstance extends Model<IBvn> {
    declare idempotency_ref: string;
    declare data_type:string;
    declare bvn: string;
}
BvnInstance.init(
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
        bvn: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'BVN is required'
                },
                notEmpty:{
                    msg: 'BVN is required'
                }
            }
        }
    
    },
    {
        sequelize: connectDB(),
        tableName: 'bvn'
    }
)

BvnInstance.sync()