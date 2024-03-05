import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';
import { checkNull } from '../utils/validators';

export interface UserShippingAttributes {
    id: string; // id is an auto-generated UUID
    user_id: string;
    location_id: string;
    house_no: string;
    area: string;
    pincode: number;
    shipping_charges: number;
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserShippingCreationAttributes extends Optional<UserShippingAttributes, 'id'> {}

interface UserShippingInstance extends Model<UserShippingAttributes, UserShippingCreationAttributes>, UserShippingAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type UserShippingStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserShippingInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const UserShipping = sequelize.define<UserShippingInstance>(
        'user_shipping',
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
            location_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            house_no: {
                type: DataTypes.STRING,
                allowNull: false
            },
            area: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pincode: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            shipping_charges: {
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
        {
            freezeTableName: true
        }
    ) as UserShippingStatic;

    UserShipping.associate = (models) => {

        UserShipping.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        UserShipping.belongsTo(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    // TODO: make common function to sync
    // await UserShipping.sync({ alter: true });

    return UserShipping;
};
