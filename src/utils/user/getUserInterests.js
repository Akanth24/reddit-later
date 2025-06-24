/**
 * Fetches the saved interests (subreddits/topics) for a given user.
 *
 * This helper calls the `/api/user/getUserInterests` API route,
 * which reads the data from DynamoDB using the user ID as the key.
 *
 * @param {string} userId - The unique ID of the user (typically from Cognito's username).
 * @returns {Promise<string[]>} - Resolves to an array of subreddit names, or an empty array if none.
 *
 * @example
 * import getUserInterests from "@/utils/getUserInterests";
 *
 * const interests = await getInterests("abc123");
 * console.log(interests); // ['technology', 'javascript']
 */
export default async function getUserInterests(userId) {
  try {
    const res = await fetch(
      `/api/user/getUserInterests?userId=${encodeURIComponent(userId)}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Unknown error");
    }

    return Array.isArray(data.interests) ? data.interests : [];
  } catch (err) {
    console.error("getInterests error:", err);
    return [];
  }
}
