export default async function handler(req, res) {
  const { subs = "", limit = 15, timeframe = "day" } = req.query;
  if (!subs)
    return res.status(400).json({ error: "query param “subs” missing" });

  // “r/a+b+c” syntax fetches from multiple subs in one hit
  const url = `https://www.reddit.com/r/${subs}/top.json?sort=top&t=${timeframe}&limit=${limit}`;

  const r = await fetch(url, { headers: { "User-Agent": "nextjs-app/1.0" } });
  if (!r.ok) return res.status(r.status).end();

  const { data } = await r.json();
  console.log(data?.children?.[0]?.data);

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
