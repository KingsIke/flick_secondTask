

import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IKARMA {
  idempotency_ref: string;
  data_type: string;
  karma: object;
} 

export class KARMAInstance extends Model<IKARMA> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  karma: object
}

KARMAInstance.init(
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
    karma:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'karma',
      }
)
KARMAInstance.sync()