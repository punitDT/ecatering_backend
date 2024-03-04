import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface MenuItemsAttributes {
    id: string; // id is an auto-generated UUID
    name: string;
    description?: string;
    cuisine_id: string;
    price?: string;
    quantity?: number;
    size?: string;
    ingredients?: [];
    location_id: boolean;
    image_url?: string;
    type?: string;
    preparation_time?: string;
    rating?: string;
    reviews?: string;
    promotions: string;
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface MenuItemsCreationAttributes extends Optional<MenuItemsAttributes, 'id'> {}

interface MenuItemsInstance extends Model<MenuItemsAttributes, MenuItemsCreationAttributes>, MenuItemsAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type MenuItemsStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => MenuItemsInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const MenuItems = sequelize.define<MenuItemsInstance>(
        'menu_items',
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
            cuisine_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            size: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ingredients: {
                type: DataTypes.STRING,  
                allowNull: true
            },
            location_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM, 
                values: ['Dish', 'Drink'],
                allowNull: true
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            preparation_time: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rating: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            reviews: {
                type: DataTypes.STRING,
                allowNull: true
            },
            promotions: {
                type: DataTypes.STRING,
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
        {
            freezeTableName: true
        }
    ) as MenuItemsStatic;

    MenuItems.associate = (models) => {
        MenuItems.belongsTo(models.locations, {
            foreignKey: 'location_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        MenuItems.hasMany(models.package_menu_items, {
            foreignKey: 'menu_item_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

    };

    // TODO: make common function to sync
    // await MenuItems.sync({ alter: true });

    return MenuItems; 
};
