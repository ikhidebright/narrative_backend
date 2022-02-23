/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from "sequelize";
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("@/config/database")[env];
const cls = require("cls-hooked");

const namespace = cls.createNamespace("narrative");
Sequelize.useCLS(namespace);
let sequelize: Sequelize;

if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export default sequelize;
