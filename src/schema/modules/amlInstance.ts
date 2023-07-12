import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IAlmInstance {
    id: string;
    almInstanceId: object;
    data: object;
  
}


export class AlmIdentityInstance extends Model<IAlmInstance> {
    declare  id: string;
     declare almInstanceId: object;
    declare  data: object
   }

   AlmIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  almInstanceId: {
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
    tableName: 'AlmResponse',
  }
  );
  AlmIdentityInstance.sync()
