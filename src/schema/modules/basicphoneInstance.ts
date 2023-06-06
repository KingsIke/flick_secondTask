import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IBPhoneInstance {
    id: string;
    phoneBasicInstanceId: string;
    data: object;
  
}


export class ResponseInstance extends Model<IBPhoneInstance> {
    declare  id: string;
     declare phoneBasicInstanceId: string;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  phoneBasicInstanceId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false
  }
},
{
    sequelize: connectDB(),
    tableName: 'BasicPhoneResponse',
  }
  );
ResponseInstance.sync()
