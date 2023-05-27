import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IPremium {
  idempotency_ref: string;
  data_type: string;
  credit_premium: object;
} 

export class PremiumInstance extends Model<IPremium> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  credit_premium: object
}

PremiumInstance.init(
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
    credit_premium:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'premium',
      }
)