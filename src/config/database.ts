import dotenv from "dotenv";
dotenv.config();

const getDialectFromUrl = () => {
  const url = process.env.DB_URL;
  if (!url) return "";
  const dialectIndex = url.indexOf("://");
  return url.slice(0, dialectIndex);
};

const coreSettings = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || getDialectFromUrl(),
  url: process.env.DB_URL,
};

const dbConfigs = {
  development: {
    ...coreSettings,
  },
  test: {
    ...coreSettings,
  },
  production: {
    ...coreSettings,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
} as any;

module.exports = dbConfigs; // this line is for compatibility with the sequelize cli
