import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IBvnInstance {
    id: string;
    bvnInstanceId: string;
    data: object;
  
}


export class BVNIdentityInstance extends Model<IBvnInstance> {
    declare  id: string;
     declare bvnInstanceId: string;
    declare  data: object
   }

   BVNIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  bvnInstanceId: {
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
    tableName: 'BvnResponse',
  }
  );
  BVNIdentityInstance.sync()
