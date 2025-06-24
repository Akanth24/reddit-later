import config from "@/lib/config";
import dynamoClient from "@/lib/dynamodbClient";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const command = new GetItemCommand({
      TableName: config.dynamodb.userInterests,
      Key: { user_id: { S: userId } },
      ProjectionExpression: "interests",
    });

    const { Item } = await dynamoClient.send(command);

    // If no record yet, return empty array
    const interests = Item ? JSON.parse(Item.interests.S || "[]") : [];

    return res.status(200).json({ interests });
  } catch (err) {
    console.error("DynamoDB error:", err);
    return res.status(500).json({ error: "Failed to fetch interests" });
  }
}
