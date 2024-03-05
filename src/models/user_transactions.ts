import { BuildOptions, Model, Optional, Sequelize, UUID, UUIDV4 } from 'sequelize';

export interface UserTransactionsAttributes {
    id: string;
    user_id: string;
    user_order_id: string;
    transation_type: string;
    user_shipping_id: string;
    total_amount: number;
    payment_transaction_id: string;
    transaction_status: string;
    transaction_response: string;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserTransactionsCreationAttribute extends Optional<UserTransactionsAttributes, 'id'> {}

interface UserTransactionsInstance extends Model<UserTransactionsAttributes, UserTransactionsCreationAttribute>, UserTransactionsAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type UserTransactionsStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserTransactionsInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const UserTransactions = sequelize.define<UserTransactionsInstance>(
        'user_transactions',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            user_order_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            transation_type: {
                type: DataTypes.ENUM,
                values: ['Online', 'COD'], 
                allowNull: false
            },
            user_shipping_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            total_amount: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            payment_transaction_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            transaction_status: {
                type: DataTypes.ENUM,
                values: ['COMPLETED', 'PENDING', 'FAILED'],
                allowNull: false
            },
            transaction_response: {
                type: DataTypes.STRING,
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
    ) as UserTransactionsStatic;

    UserTransactions.associate = (models) => {
        UserTransactions.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        UserTransactions.belongsTo(models.user_orders, {
            foreignKey: 'user_order_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

    };

    //await UserTransactions.sync({ alter: true });

    return UserTransactions;
};
