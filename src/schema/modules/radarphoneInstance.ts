import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IRDPhoneInstance {
    id: string;
    radarphoneInstanceId: object;
    data: object;
  
}


export class RDPhoneIdentityInstance extends Model<IRDPhoneInstance> {
    declare  id: string;
     declare radarphoneInstanceId: object;
    declare  data: object
   }

   RDPhoneIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  radarphoneInstanceId: {
    type: DataTypes.JSON,
    allowNull: false
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false
  }
},
{
    sequelize: connectDB(),
    tableName: 'RadarPhoneResponse',
  }
  );
  RDPhoneIdentityInstance.sync()
