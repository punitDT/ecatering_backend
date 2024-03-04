import {Categories}  from './categories';

import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface Cusins {
    id: string; // id is an auto-generated UUID
    cusine_name: string;
    category_id:string,
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CusinsCreationAttributes extends Optional<Cusins, 'id'> {}

interface CategoriesInstance extends Model<Cusins, CusinsCreationAttributes>, Cusins {
    createdAt?: Date;
    updatedAt?: Date;
}

type UserStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => CategoriesInstance);

export default async (sequelize: Sequelize, DataTypes: any) => {
    const Cusins = sequelize.define<CategoriesInstance>(
        'cusins',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            category_id :{
                type:DataTypes.UUID,
                allowNull:false,
    
            },
            cusine_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            is_active: {
                defaultValue:true,
                type: DataTypes.BOOLEAN,
                allowNull: false

            },
            _deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            }
        },
        {
            freezeTableName: true
        }
    ) as UserStatic;

    Cusins.associate = (models) => {
        Cusins.hasMany(models.Categories, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'cusin'
        });
    };

    // TODO: make common function to sync
    // await Cusins.sync({ alter: true });

    return Cusins;
};
  