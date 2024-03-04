import { BuildOptions, Model, Optional, Sequelize, UUID, UUIDV4 } from 'sequelize';

export interface CityAttributes {
    id: string;
    name: string;
    country: string;
    total_packages: number;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CityCreationAttribute extends Optional<CityAttributes, 'id'> {}

interface CityInstance extends Model<CityAttributes, CityCreationAttribute>, CityAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type CityStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => CityInstance);

export default  (sequelize: Sequelize, DataTypes: any) => {
    const Cities = sequelize.define<CityInstance>(
        'cities',
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
            country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            total_packages: {
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
    ) as CityStatic;

    Cities.associate = (models) => {
        Cities.hasMany(models.locations, {
            foreignKey: 'city_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    //await Cities.sync({ alter: true }); 

    return Cities;
};
