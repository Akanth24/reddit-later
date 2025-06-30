import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

/** A singleton DynamoDB client shared across the app. */
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION ?? 'ap-south-1',
});

export default dynamoClient;
