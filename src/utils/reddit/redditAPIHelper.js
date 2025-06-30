export async function getRedditToken() {
  console.log('CLIENT_ID',process.env.CLIENT_ID);
  console.log('CLIENT_SECRET',process.env.CLIENT_SECRET);
  
  const creds = Buffer
    .from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
    .toString("base64");

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "script:reddit-weekly:v1.0", 
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
