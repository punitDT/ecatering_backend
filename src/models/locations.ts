import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface LocationAttributes {
    id: string; // id is an auto-generated UUID
    name: string;
    city_id: string;
    address: string;
    postal_code: string;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface LocationCreationAttributes extends Optional<LocationAttributes, 'id'> {}

interface LocationInstance extends Model<LocationAttributes, LocationCreationAttributes>, LocationAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type LocationStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => LocationInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const Locations = sequelize.define<LocationInstance>(
        'locations',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            name: {
                type: DataTypes.JSON,
                allowNull: false
            },
            city_id: {
                type: DataTypes.UUID,
                allowNull: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postal_code: {
                type: DataTypes.STRING,
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
        {
            freezeTableName: true
        }
    ) as LocationStatic;

    Locations.associate = (models) => {
        Locations.belongsTo(models.cities, {
            foreignKey: 'city_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE', 
        });

        Locations.hasMany(models.occasions, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        Locations.hasMany(models.menu_items, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        Locations.hasMany(models.packages, { 
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

    };

    // TODO: make common function to sync
    // await Locations.sync({ alter: true });

    return Locations;
};
