import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IFirstCentral {
  idempotency_ref: string;
  data_type: string;
  credit_first_central: object;
} 

export class CreditInstance extends Model<IFirstCentral> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  credit_first_central: object
}

CreditInstance.init(
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
    credit_first_central:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'creditCentral',
      }
)