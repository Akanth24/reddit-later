import React, { useEffect, useState } from "react";
import fetchTopPosts from "@/utils/reddit/fetchTopPosts";
import PostCard from "./PostCard";
import LoadingScreen from "../LoadingScreen";

/**
 * PostFeed
 * --------
 * Fetches AND renders Reddit top-posts for the given sub-reddits.
 *
 * @param {string[]}  subs      Required array of subreddit names
 * @param {number}    limit     Max posts to fetch (default 20)
 * @param {string}    timeframe 'hour' | 'day' | 'week' | … (default 'day')
 */
export default function PostFeed({
  subs = [],
  limit = 20,
  timeframe = "day",
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch whenever subs / limit / timeframe change
  useEffect(() => {
    if (!subs.length) {
      setPosts([]);
      return;
    }
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTopPosts({ subs, limit, timeframe });
        if (!cancelled) setPosts(data);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [subs.join("|"), limit, timeframe]);

  if (!subs.length) return null;

  return (
    <div className="feed">
      {loading && <LoadingScreen />}
      {error && <p className="hint error">{error}</p>}

      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}

      <style jsx>{`
        .feed {
          margin-top: 3rem;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }

        .loading {
          opacity: 0.8;
          font-size: 0.9rem;
        }
        .error {
          color: #ff6b6b;
        }

      `}</style>
    </div>
  );
}
