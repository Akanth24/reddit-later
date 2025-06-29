import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

/** A singleton DynamoDB client shared across the app. */
const dynamoClient = new DynamoDBClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export default dynamoClient;
