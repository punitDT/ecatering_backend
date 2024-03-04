
import { Cusins } from './cusins';

import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface Categories {
    id: string; // id is an auto-generated UUID
    category_name: string;
    total_packages: number;
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // Association Fields
    // cusines?: Cusines[];
}

interface CategoriesCreationAttributes extends Optional<Categories, 'id'> {}

interface CategoriesInstance extends Model<Categories, CategoriesCreationAttributes>, Categories {
    createdAt?: Date;
    updatedAt?: Date;
}

type CategoriesStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => CategoriesInstance);

export default async (sequelize: Sequelize, DataTypes: any) => {
    const Categories = sequelize.define<CategoriesInstance>(
        'categories',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            category_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            total_packages: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue:0,
                
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
    ) as CategoriesStatic;

    Categories.associate = (models) => {
        Categories.hasMany(models.cusines, {
            foreignKey: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    // TODO: make common function to sync
    // await Categories.sync({ alter: true });

    return Categories;
};