import { BuildOptions, Model, Optional, Sequelize, UUID, UUIDV4 } from 'sequelize';

export interface PackageAttributes {
    id: string;
    name: string;
    descripton: string;
    images: [];
    location_id: string;
    price: number;
    serving_size: number;
    occasion_id: string;
    menu_items: [];
    availability: string;
    serving_type: string;
    dish_type: string;
    min_order_quantity: number;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PackageCreationAttribute extends Optional<PackageAttributes, 'id'> {}

interface PackageInstance extends Model<PackageAttributes, PackageCreationAttribute>, PackageAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type PackageStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => PackageInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const Packages = sequelize.define<PackageInstance>(
        'packages',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripton: {
                type: DataTypes.STRING,
                allowNull: false
            },
            images: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            location_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            serving_size: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            serving_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dish_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            occasion_id: { 
                type: DataTypes.UUID,
                allowNull: false
            },
            menu_items: {
                type: DataTypes.UUID,
                allowNull: false
            },
            availability: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            min_order_quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            _deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            }
        },
        { freezeTableName: true }
    ) as PackageStatic;

    Packages.associate = (models) => {
        Packages.belongsTo(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        Packages.belongsTo(models.occasions, {
            foreignKey: 'occasion_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        Packages.hasMany(models.package_menu_items, {
            foreignKey: 'package_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    //await Packages.sync({ alter: true });

    return Packages;
};
