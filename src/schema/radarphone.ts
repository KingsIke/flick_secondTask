import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IRDPHONE {
  idempotency_ref: string;
  data_type: string;
  radar_phone: object;
} 

export class RDPHONEInstance extends Model<IRDPHONE> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  radar_phone: object
}

RDPHONEInstance.init(
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
    radar_phone:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'radar_phone',
      }
)
RDPHONEInstance.sync()