// utils/reddit/redditAPIHelper.js
export async function getRedditToken() {
  const creds = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
      // Reddit *also* wants a UA here
      "User-Agent": "RedditWeeklyDigestBot/1.0",
    },
    // ➜ add scope=read
    body: "grant_type=client_credentials&scope=read",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`token request failed ${res.status}: ${txt.slice(0,200)}`);
  }
  return (await res.json()).access_token;
}
