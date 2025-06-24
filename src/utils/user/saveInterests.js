/**
 * Save a Reddit Later user's selected interests to the backend.
 *
 * The helper hits the `/api/saveInterests` API route, which is expected to
 * persist Interests to DynamoDB (or any datastore behind that endpoint).
 *
 * @param {string} userId       - The Cognito/Amplify user’s unique ID.
 * @param {string[]} interests  - Array of subreddit names (e.g. ['technology', 'worldnews']).
 * @returns {Promise<string>}   - Resolves to a status message for UI feedback.
 *
 * @example
 * import saveInterests from "@/utils/saveInterests";
 *
 * const msg = await saveInterests("abc123", ["technology", "javascript"]);
 * console.log(msg); // → "Interests saved successfully!"
 */

export default async function saveInterests(userId, interests) {
  try {
    const res = await fetch("/api/user/saveInterests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, interests }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Unknown server error");
    }

    return "Interests saved successfully!";
  } catch (err) {
    console.error("saveInterests error:", err);
    return "Error saving Interests";
  }
}
