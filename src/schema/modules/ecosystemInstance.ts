import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IEcosystemInstance {
    id: string;
    ecosystemInstanceId: object;
    data: object;
  
}


export class EcosystemIdentityInstance extends Model<IEcosystemInstance> {
    declare  id: string;
     declare ecosystemInstanceId: object;
    declare  data: object
   }

   EcosystemIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ecosystemInstanceId: {
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
    tableName: 'EcosystemResponse',
  }
  );
  EcosystemIdentityInstance.sync()
