import config from "@/lib/config";
import dynamoClient from "@/lib/dynamodbClient";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { userId, userEmail, interests } = req.body;
    if (!userId || !Array.isArray(interests)) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const command = new PutItemCommand({
      TableName: config.dynamodb.userInterests,
      Item: {
        user_id: { S: userId },
        user_email: {S: userEmail},
        interests: { S: JSON.stringify(interests) },
      },
    });

    await dynamoClient.send(command);
    res.status(200).json({ message: "interests saved" });
  } catch (err) {
    console.error("DynamoDB error:", err);
    res.status(500).json({ error: "Failed to save interests" });
  }
}
