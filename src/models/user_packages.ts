import { BuildOptions, Model, Optional, Sequelize, UUID, UUIDV4 } from 'sequelize';

export interface UserPackageAttributes {
    id: string;
    package_id: string;
    menu_item_id: [];
    user_id: string;
    location_id: string;
    custom: boolean;
    is_veg: boolean;
    is_non_veg: boolean;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserPackageCreationAttribute extends Optional<UserPackageAttributes, 'id'> {}

interface UserPackageInstance
    extends Model<UserPackageAttributes, UserPackageCreationAttribute>,
        UserPackageAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type PackageMenuItemStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserPackageInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const UserPackage = sequelize.define<UserPackageInstance>(
        'user_package',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            package_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            menu_item_id: {
                type: DataTypes.Array(DataTypes.UUID),
                allowNull: false
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            location_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            custom: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            is_veg: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            is_non_veg: {
                type: DataTypes.BOOLEAN,
                allowNull: true
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
    ) as PackageMenuItemStatic;

    UserPackage.associate = (models) => {
        UserPackage.belongsTo(models.packages, {
            foreignKey: 'package_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        UserPackage.belongsTo(models.menu_items, {
            foreignKey: 'menu_item_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        UserPackage.belongsTo(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        UserPackage.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        UserPackage.hasMany(models.user_orders, {
            foreignKey: 'user_package_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    //await PackageMenuItem.sync({ alter: true });

    return UserPackage;
};
