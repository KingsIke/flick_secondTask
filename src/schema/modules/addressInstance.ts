import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IAddressInstance {
    id: string;
    addressInstanceId: object;
    data: object;
  
}


export class ResponseInstance extends Model<IAddressInstance> {
    declare  id: string;
     declare addressInstanceId: object;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  addressInstanceId: {
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
    tableName: 'AddressResponse',
  }
  );
ResponseInstance.sync()