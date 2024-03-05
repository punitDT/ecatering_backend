
import { CusineAttributes } from './cusines';

import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface CategoryAttributes {
    id: string; // id is an auto-generated UUID
    name: string;
    description? :string;
    total_packages: number;
    image?:String;
    image_url? :string;
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // Association Fields
    // cusines?: Cusines[];
}

interface CategoriesCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

interface CategoriesInstance extends Model<CategoryAttributes, CategoriesCreationAttributes>, CategoryAttributes {
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
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description : {
                type: DataTypes.STRING,
                allowNull :true,
            },
            total_packages: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue:0,
                
            },
            image:{
                type : DataTypes.STRING,
                allowNull :true,
            },
            image_url:{
                type : DataTypes.STRING,
                allowNull :true,
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
