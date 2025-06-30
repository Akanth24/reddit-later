// lib/dynamodbClient.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "ap-south-1",   // fallback for local dev
  // credentials: leave empty → SDK uses Lambda’s role
});
