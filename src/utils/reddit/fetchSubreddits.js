/**
 * Fetches a list of popular subreddits from the API.
 *
 * @param {number} pages - How many pages (100 subs per page). Max: 10
 * @returns {Promise<string[]>} - Array of subreddit names (e.g., ["technology", "programming"])
 */
const fetchSubreddits = async (pages = 3) => {
  try {
    const res = await fetch(`/api/reddit/subreddits?pages=${pages}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const { subreddits } = await res.json();

    return subreddits.map((s) => s.name);
  } catch (err) {
    console.error("Failed to fetch subreddits:", err);
    return [];
  }
};

export default fetchSubreddits;
