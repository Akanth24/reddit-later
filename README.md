# Reddit Later 

Reddit Later is a serverless web application that sends you a personalized weekly digest of top Reddit posts from your favorite subreddits — every Monday. It's built to save time, cut out noise, and keep you informed.

## Features

- Choose your favorite subreddits
- Get a weekly email every Monday with top 5 posts
- Posts are summarized using Amazon Bedrock (GenAI)
- Preferences stored securely in DynamoDB
- Fully serverless architecture using AWS

---

##  How It Works

1. **User selects subreddits and provides email** via the web app (built in Next.js).
2. **Preferences are saved** in a DynamoDB table.
3. **Every Monday**, an Amazon EventBridge rule triggers an AWS Lambda function.
4. The Lambda function:
   - Fetches top posts from selected subreddits using the Reddit API
   - Summarizes the posts using Amazon Bedrock (foundation models)
   - Formats the content into an email
   - Sends the digest using AWS SES

---

## ⚙️ Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | Next.js                |
| Database     | AWS DynamoDB           |
| Scheduler    | Amazon EventBridge     |
| Backend      | AWS Lambda             |
| Summarization| Amazon Bedrock         |
| Email        | AWS SES                |
| External API | Reddit API             |

No DOOMSCROLLING ANYMORE!!!
