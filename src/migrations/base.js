/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { DataTypes } = require("sequelize");

module.exports = {
  up: async () => {},
  down: async () => {},
};

module.exports.base = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE,
};
