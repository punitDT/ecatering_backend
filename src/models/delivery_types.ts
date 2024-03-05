import { BuildOptions, Model, Optional, Sequelize, UUID, UUIDV4 } from 'sequelize';

export interface DeliveryTypeAttributes {
    id: string;
    location_id: string;
    order_id: string;
    waiter_count: number;
    waiter_charge: number;
    delivery_charge: number;
    transportation_charge: number;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface DeliveryTypeCreationAttribute extends Optional<DeliveryTypeAttributes, 'id'> {}

interface DeliveryTypeInstance
    extends Model<DeliveryTypeAttributes, DeliveryTypeCreationAttribute>,
        DeliveryTypeAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type DeliveryTypeStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => DeliveryTypeInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const DeliveryType = sequelize.define<DeliveryTypeInstance>(
        'delivery_types',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            location_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            order_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            waiter_count: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            waiter_charge: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            delivery_charge: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            transportation_charge: {
                type: DataTypes.DOUBLE,
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
    ) as DeliveryTypeStatic;

    DeliveryType.associate = (models) => {
        DeliveryType.belongsTo(models.user_orders, {
            foreignKey: 'order_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        DeliveryType.belongsTo(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    //await UserOrders.sync({ alter: true });

    return DeliveryType;
};
