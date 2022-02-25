/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
"use strict";
const { base } = require("./base");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable("order", {
      ...base,
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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("order");
  },
};
