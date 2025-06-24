import dotenv from "dotenv";
import path from "path";

const env = process.env.APP_ENV || "dev";
const envFilePath = path.resolve(process.cwd(), `./config/${env}.env`);
dotenv.config({ path: envFilePath });

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_ENV: process.env.APP_ENV,
  }
};

console.log(`Environment Variable - APP_ENV: ${process.env.APP_ENV}`);

export default nextConfig;
