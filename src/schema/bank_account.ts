import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IBANK {
  idempotency_ref: string;
  data_type: string;
  bank_account: object;
} 

export class BankInstance extends Model<IBANK> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  bank_account: object
}

BankInstance.init(
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
    bank_account:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'bank_account',
      }
)
BankInstance.sync()