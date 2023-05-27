import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface ICRC {
  idempotency_ref: string;
  data_type: string;
  credit_crc: object;
} 

export class CRCInstance extends Model<ICRC> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  credit_crc: object
}

CRCInstance.init(
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
    credit_crc:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'CrcData',
      }
)
CRCInstance.sync()