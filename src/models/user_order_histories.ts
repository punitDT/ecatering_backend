import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';
import { checkNull } from '../utils/validators';

export interface UserOrderHistoryAttributes {
    id: string; // id is an auto-generated UUID
    user_package_id: string;
    user_transaction_id: string;
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserOrderHistoryCreationAttributes extends Optional<UserOrderHistoryAttributes, 'id'> {}

interface UserOrderHistoryInstance extends Model<UserOrderHistoryAttributes, UserOrderHistoryCreationAttributes>, UserOrderHistoryAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type UserOrderHistoryStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserOrderHistoryInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const UserOrderHistory = sequelize.define<UserOrderHistoryInstance>(
        'user_order_history',
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
            user_transaction_id: {
                type: DataTypes.UUID,
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
    ) as UserOrderHistoryStatic;

    UserOrderHistory.associate = (models) => {
        UserOrderHistory.belongsTo(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    // TODO: make common function to sync
    // await UserOrderHistory.sync({ alter: true });

    return UserOrderHistory;
};
