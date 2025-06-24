import dotenv from "dotenv";
import path from "path";

const env = process.env.APP_ENV || "dev";
const envPath = path.resolve(process.cwd(), `./config/${env}.env`);

dotenv.config({ path: envPath });

const config = {
  appEnv: env,
  dynamodb: {
    userInterests: process.env.DYNAMODB_USER_INTERESTS_TABLE_NAME,
  }
};

export default config;
