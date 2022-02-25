import { Model, DataTypes, Sequelize } from "sequelize";

interface OrderAttributes {
  id?: string;
  name: string;
  max_bid_price: number;
  data_package_type: "Device Location" | "Device Behavior" | "ID Mapping";
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  id?: string;
  name: string;
  max_bid_price: number;
  data_package_type: "Device Location" | "Device Behavior" | "ID Mapping";
}

function connectModelAttrs(sequelize: Sequelize): void {
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      max_bid_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      data_package_type: {
        type: DataTypes.ENUM(
          "Device Location",
          "Device Behavior",
          "ID Mapping"
        ),
        allowNull: false,
      },
    },
    {
      tableName: "order",
      sequelize,
    }
  );
}

function connectModelAssocs() {
  //
}

const init = {
  connectModelAttrs,
  connectModelAssocs,
};

export { Order, init, OrderAttributes };
