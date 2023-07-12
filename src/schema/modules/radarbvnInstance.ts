import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IRDBVNInstance {
    id: string;
    radarbvnInstanceId: object;
    data: object;
  
}


export class RDBVNIdentityInstance extends Model<IRDBVNInstance> {
    declare  id: string;
     declare radarbvnInstanceId: object;
    declare  data: object
   }

   RDBVNIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  radarbvnInstanceId: {
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
    tableName: 'RadarBvnResponse',
  }
  );
  RDBVNIdentityInstance.sync()
