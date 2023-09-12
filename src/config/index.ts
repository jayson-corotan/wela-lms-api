import * as dotenv from "dotenv";
dotenv.config();

export default {
  ALGORITHM: process.env.ALGORITHM,
  SECRET_KEY: process.env.SECRET_KEY,
  PRIVATEKEY: process.env.PRIVATEKEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  MONGODB: process.env.MONGODB
};