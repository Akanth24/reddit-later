import dotenv from "dotenv";
import path from "path";

const env = process.env.APP_ENV || "dev";
const envFilePath = path.resolve(process.cwd(), `./config/${env}.env`);
dotenv.config({ path: envFilePath });

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_ENV: process.env.APP_ENV,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "external-preview.redd.it",
      },
      {
        protocol: "https",
        hostname: "preview.redd.it",
      },
      {
        protocol: "https",
        hostname: "i.redd.it",
      },
      {
        protocol: "https",
        hostname: "a.thumbs.redditmedia.com",
      },
      {
        protocol: "https",
        hostname: "b.thumbs.redditmedia.com",
      },
    ],
  },
};

console.log(`Environment Variable - APP_ENV: ${process.env.APP_ENV}`);

export default nextConfig;
