import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IRDBVN {
  idempotency_ref: string;
  data_type: string;
  radar_bvn: object;
} 

export class RDBvnInstance extends Model<IRDBVN> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  radar_bvn: object
}

RDBvnInstance.init(
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
    radar_bvn:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'radar_bvn',
      }
)
RDBvnInstance.sync()