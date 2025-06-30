/**
 * GET /api/subreddits
 *
 * Optional query params:
 *   ?pages=5      // how many Reddit pages to fetch (1–10, default 3 → 300 subs)
 *
 * Returns: { subreddits: [...], pagesFetched: n }
 */

export default async function handler(req, res) {
  const MAX_PAGES = 10; // Reddit caps at 1 000 subs (10 × 100)
  const pagesRequested = Math.min(Number(req.query.pages) || 3, MAX_PAGES);

  const subreddits = [];
  let after = null;
  let page = 0;

  const token = await getRedditToken();

  try {
    /* ---------- loop over Reddit pages ---------- */
    do {
      const url =
        `https://oauth.reddit.com/subreddits/popular.json` +
        `?limit=100${after ? `&after=${after}` : ""}&raw_json=1`;

      const { data } = await fetchRedditJson(token, url);
      after = data.after;
      page++;

      data.children.forEach(({ data: s }) => {
        subreddits.push({
          name: s.display_name.toLowerCase(),
          title: s.title ?? "-",
          subscriber_count: s.subscribers ?? 0,
          icon_img: s.icon_img ?? "",
          over18: !!s.over18,
          created_utc: s.created_utc,
        });
      });
    } while (after && page < pagesRequested);

    /* ---------- return JSON ---------- */
    res.status(200).json({ subreddits, pagesFetched: page });
  } catch (err) {
    console.error("Reddit fetch failed:", err);
    res.status(502).json({ error: "Failed to fetch subreddit list" });
  }
}

/* ---------- helpers ---------- */
 
async function getRedditToken() {
  console.log('CLIENT_ID',process.env.REDDIT_CLIENT_ID);
  console.log('region',process.env.AWS_REGION);
  console.log('CLIENT_SECRET',process.env.REDDIT_CLIENT_SECRET);
  
  const creds = Buffer
    .from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`)
    .toString("base64");

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "web:read-it-later:v1.0"
    },
    body: "grant_type=client_credentials&scope=read",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`TOKEN ERROR ${res.status}:`, text.slice(0, 300));
    throw new Error(`Token request failed ${res.status}`);
  }

  const { access_token } = await res.json();
  console.log("TOKEN_GRANTED", access_token);
  return access_token;
}

async function fetchRedditJson(token, url) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "RedditWeeklyDigestBot/1.0",
    "Accept": "application/json",
  };

  for (let attempt = 1; attempt <= 2; attempt++) {
    const res = await fetch(url, { headers });
      console.log("response reddits",res)

    const type = res.headers.get("content-type") || "";

    /* success path */
    if (res.ok && type.includes("application/json")) return res.json();

    /* retry once if we hit Cloudflare / 4xx */
    console.warn(`Attempt ${attempt} → status ${res.status}`);
    if (attempt === 2) {
      const body = await res.text();
      throw new Error(`Reddit non-JSON ${res.status}: ${body.slice(0, 160)}…`);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}
