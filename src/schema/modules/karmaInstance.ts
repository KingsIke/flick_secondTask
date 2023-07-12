import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IKarmaInstance {
    id: string;
    karmaInstanceId: object;
    data: object;
  
}


export class KarmaIdentityInstance extends Model<IKarmaInstance> {
    declare  id: string;
     declare karmaInstanceId: object;
    declare  data: object
   }

   KarmaIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  karmaInstanceId: {
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
    tableName: 'KarmaResponse',
  }
  );
  KarmaIdentityInstance.sync()
