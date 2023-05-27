
import { Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";




export interface CACAttribute {
    idempotency_ref: string;
    data_type: string;
    cac: object;
  }

export class CACInstance extends Model<CACAttribute> {
    declare idempotency_ref: string;
    declare data_type: string;
    declare cac: object;
}
CACInstance.init(
    {
       
      idempotency_ref: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      data_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cac: {
        type: DataTypes.JSON,
        allowNull: false          
      },
    
    },
    {
        sequelize: connectDB(),
        tableName: 'cac'
    }
)

CACInstance.sync()




// "idempotency_ref": "{{$randomUUID}}",
// "data_type": "cac",
// "cac": {
// "rc_number": "1261103",
// "company_name": "ADAFRUIT LIMITED",
// "company_type": "RC"
// }
// }