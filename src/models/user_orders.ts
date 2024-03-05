import { BuildOptions, Model, Optional, Sequelize, UUID, UUIDV4 } from 'sequelize';

export interface UserOrderAttributes {
    id: string;
    user_package_id: string;
    delivery_time: string;
    delivery_type: string;
    order_amount: number;
    gst_amount: number;
    delivery_type_id: string;
    next_order_date: Date;
    total_guest_count: string;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserOrderCreationAttribute extends Optional<UserOrderAttributes, 'id'> {}

interface UserOrderInstance extends Model<UserOrderAttributes, UserOrderCreationAttribute>, UserOrderAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type UserOrderStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserOrderInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const UserOrders = sequelize.define<UserOrderInstance>(
        'user_orders',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            user_package_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            delivery_time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            delivery_type: {
                type: DataTypes.UUID,
                allowNull: false
            },
            order_amount: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            gst_amount: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            delivery_type_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            next_order_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            total_guest_count: {
                type: DataTypes.NUMBER,
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
    ) as UserOrderStatic;

    UserOrders.associate = (models) => {
        UserOrders.hasOne(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        UserOrders.hasOne(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        UserOrders.hasMany(models.user_transactions, {
            foreignKey: 'user_order_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // UserOrders.belongsTo(models.user_packages, {
        //     foreignKey: 'user_package_id',
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE'
        // });

        UserOrders.hasMany(models.delivery_types, {
            foreignKey: 'order_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

    };

    //await UserOrders.sync({ alter: true });

    return UserOrders;
};
