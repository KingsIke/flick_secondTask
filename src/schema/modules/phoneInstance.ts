import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IPhoneInstance {
    id: string;
    phoneInstanceId: string;
    data: string;
  
}


export class PhoneIdentityInstance extends Model<IPhoneInstance> {
    declare  id: string;
     declare phoneInstanceId: string;
    declare  data: object
   }

   PhoneIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  phoneInstanceId: {
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
    tableName: 'PhoneResponse',
  }
  );
  PhoneIdentityInstance.sync()
