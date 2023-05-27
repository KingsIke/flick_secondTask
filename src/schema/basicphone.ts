import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IBPHONE {
  idempotency_ref: string;
  data_type: string;
  phone_basic: string;
} 

export class BPhoneInstance extends Model<IBPHONE> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  phone_basic: string
}

BPhoneInstance.init(
  {
    idempotency_ref:{
    
              type: DataTypes.UUID,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4,
              allowNull: false,
            },
    data_type:{
      type: DataTypes.STRING,
            allowNull: false,
    },
    phone_basic:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'basic_phone',
      }
)
BPhoneInstance.sync()