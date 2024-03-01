import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface OccasionAttributes {
    id: string; // id is an auto-generated UUID
    name: string;
    description: string;
    location_id: string;
    start_time?: Date;
    end_time?: Date;
    occasion_type?: string;
    image_url?: string;
    capacity?: number;
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface OccasionCreationAttributes extends Optional<OccasionAttributes, 'id'> {}

interface OccasionInstance extends Model<OccasionAttributes, OccasionCreationAttributes>, OccasionAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type OccasionStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => OccasionInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const Occasions = sequelize.define<OccasionInstance>(
        'occasions',
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
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            location_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            start_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            occasion_type: {
                type: DataTypes.ENUM('Birthday', 'Anniversary'),
                allowNull: false
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            capacity: {
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
        {
            freezeTableName: true
        }
    ) as OccasionStatic;

    Occasions.associate = (models) => {
        Occasions.belongsTo(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'userRole'
        });
    };

    // TODO: make common function to sync
    // await Occasions.sync({ alter: true });

    return Occasions;
};
