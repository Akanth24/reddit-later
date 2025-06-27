/**
 * fetchTopPosts
 * -------------
 * Call your `/api/topPosts` route and return the array of post objects.
 *
 * @param {Object} opts
 * @param {string[]}  opts.subs      – Array of subreddit names (e.g. ['reactjs', 'javascript']).
 * @param {number}   [opts.limit=20] – How many posts to fetch (max-100 due to Reddit API).
 * @param {string}   [opts.timeframe='day']
 *                      One of: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'
 *                      (passed straight through to Reddit’s `t=` query).
 *
 * @returns {Promise<Array>}  Resolves to an array like:
 *          [
 *            {
 *              id: 'abc123',
 *              title: 'Post title…',
 *              score: 321,
 *              author: 'spez',
 *              numComments: 27,
 *              permalink: 'https://www.reddit.com/r/reactjs/…',
 *              url: 'https://i.redd.it/…',         // or external link
 *              thumbnail: 'https://…jpg' | null
 *            },
 *            …
 *          ]
 *
 * Throws if:
 *   – `subs` is empty/undefined
 *   – Network error / non-2xx response
 *
 * Usage example  (in a React effect):
 * ------------------------------------------------------------
 *   import fetchTopPosts from "@/utils/reddit/fetchTopPosts";
 *
 *   useEffect(() => {
 *     if (!selectedSubs.length) return;
 *     fetchTopPosts({ subs: selectedSubs, limit: 25, timeframe: "week" })
 *       .then(setPosts)
 *       .catch(console.error);
 *   }, [selectedSubs]);
 * ------------------------------------------------------------
 */

const fetchTopPosts = async ({
  subs,
  limit = 20,
  timeframe = "day",
} = {}) => {
  // Guard-rail: subs must be a non-empty array
  if (!Array.isArray(subs) || !subs.length) {
    throw new Error("fetchTopPosts: `subs` must be a non-empty array");
  }

  // Build the query string:
  //   r/reactjs+javascript   (Reddit’s multi-subreddit syntax)
  const subsParam = subs
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .join("+");

  // Encode just in case an unexpected char slips through
  const url = `/api/reddit/topPosts?subs=${encodeURIComponent(
    subsParam
  )}&limit=${limit}&timeframe=${timeframe}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      // Bubble up server-side error details if available
      const msg = await res.text();
      throw new Error(
        `fetchTopPosts: ${res.status} ${res.statusText} – ${msg || "unknown"}`
      );
    }

    const data = await res.json(); // -> array of posts from the API route
    return data;
  } catch (err) {
    // Re-throw so calling code can handle it (e.g. show a toast)
    throw err;
  }
};

export default fetchTopPosts;
