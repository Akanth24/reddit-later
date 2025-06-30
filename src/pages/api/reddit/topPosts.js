export default async function handler(req, res) {
  const { subs = "", limit = 15, timeframe = "day" } = req.query;
  if (!subs)
    return res.status(400).json({ error: "query param “subs” missing" });

  const token = await getRedditToken();

  // “r/a+b+c” syntax fetches from multiple subs in one hit
  const url = `https://oauth.reddit.com/r/${subs}/top.json?sort=top&t=${timeframe}&limit=${limit}`;

  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "RedditWeeklyDigestBot/1.0",
      "Accept": "application/json",
    },
  });
  console.log("response TOP POSTS",r)
  if (!r.ok) return res.status(r.status).end();
  const { data } = await r.json();
  const posts = data.children.map(({ data: p }) => ({
    id: p.id,
    subreddit: p.subreddit,
    title: p.title,
    score: p.score,
    author: p.author,
    numComments: p.num_comments,
    permalink: `https://www.reddit.com${p.permalink}`,
    url: p.url,
    thumbnail: p.thumbnail?.startsWith("http") ? p.thumbnail : null,
    preview: p.preview,
    created_utc: p.created_utc,
  }));

  res.status(200).json(posts);
}

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
