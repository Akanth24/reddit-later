export async function getRedditToken() {
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
    },
    body: "grant_type=client_credentials",
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
