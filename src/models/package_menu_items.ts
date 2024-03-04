import { BuildOptions, Model, Optional, Sequelize, UUID, UUIDV4 } from 'sequelize';

export interface PackageMenuItemAttributes {
    id: string;
    package_id: string;
    menu_item_id: string;
    total_price: number;
    unit_price: number;
    min_serving_size: number;
    guest_per_waiter: number;
    quantity: number;
    size: string;
    is_active?: boolean;
    _deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PackageMenuItemCreationAttribute extends Optional<PackageMenuItemAttributes, 'id'> {}

interface PackageMenuItemInstance
    extends Model<PackageMenuItemAttributes, PackageMenuItemCreationAttribute>,
        PackageMenuItemAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type PackageMenuItemStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => PackageMenuItemInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const PackageMenuItem = sequelize.define<PackageMenuItemInstance>(
        'package_menu_items',
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
                type: DataTypes.UUID,
                allowNull: false
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            unit_price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            guest_per_waiter: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            min_serving_size: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            size: {
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
    ) as PackageMenuItemStatic;

    PackageMenuItem.associate = (models) => {
        PackageMenuItem.belongsTo(models.packages, {
            foreignKey: 'package_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        PackageMenuItem.belongsTo(models.menu_items, {
            foreignKey: 'menu_item_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    //await PackageMenuItem.sync({ alter: true });

    return PackageMenuItem;
};
