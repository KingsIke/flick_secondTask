
import { Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface IVoterCardInstance {
    idempotency_ref: string;
    data_type: string;
    voters_card: string;
  
}

export class VoterCardInstance extends Model<IVoterCardInstance> {
    declare idempotency_ref: string;
    declare data_type:string;
    declare voters_card: string;
}
VoterCardInstance.init(
    {
        idempotency_ref: {
            type: DataTypes.UUID,
        primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
        },
        data_type:{
            type: DataTypes.STRING,
            allowNull: false,
        
        },
        voters_card: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'Voters Card is required'
                },
                notEmpty:{
                    msg: 'Voters Card is required'
                }
            }
        }
    
    },
    {
        sequelize: connectDB(),
        tableName: 'voterscard'
    }
)

VoterCardInstance.sync()