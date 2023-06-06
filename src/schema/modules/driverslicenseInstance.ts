import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IDriverInstance {
    id: string;
    driverlicInstanceId: object;
    data: object;
  
}


export class ResponseInstance extends Model<IDriverInstance> {
    declare  id: string;
     declare driverlicInstanceId: object;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  driverlicInstanceId: {
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
    tableName: 'DriverLicenseResponse',
  }
  );
ResponseInstance.sync()
