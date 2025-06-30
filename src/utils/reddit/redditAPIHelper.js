export async function getRedditToken() {
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
       "User-Agent": "RedditWeeklyDigestBot/1.0"
    },
    body: "grant_type=client_credentials&scope=read"
  });

  const json = await res.json();
  console.log("TOKEN_GRANTED",json.access_token);
  
  return json.access_token;
}