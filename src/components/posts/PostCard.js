import React from "react";
import Image from "next/image";
import moment from "moment-timezone";

export default function PostCard({ post }) {
  const {
    title,
    permalink,
    thumbnail,
    preview,
    score,
    numComments,
    author,
    created_utc,
  } = post;

  const timeAgo = moment.unix(created_utc).tz("Asia/Kolkata").fromNow();

  const previewUrl =
    preview?.images?.[0]?.resolutions?.slice(-1)?.[0]?.url?.replace(/&amp;/g, "&") ||
    (thumbnail && thumbnail.startsWith("http") ? thumbnail : null);

  return (
    <article className="card">
      {/* ---------- IMAGE BANNER (responsive) ---------- */}
      {previewUrl && (
        <div className="thumb-wrap">
          <Image
            src={previewUrl}
            alt=""
            fill            /* fills its relatively-positioned parent */
            unoptimized     /* keep if you fetch arbitrary URLs */
            sizes="(max-width: 640px) 100vw, 600px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {/* ---------- CONTENT ---------- */}
      <div className="content">
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="title"
        >
          {title}
        </a>

        <div className="meta">
          <span className="score">▲ {score.toLocaleString()}</span>
          <span className="comments">💬 {numComments}</span>
          <span className="time">{timeAgo}</span>
          <span className="author">u/{author}</span>
        </div>
      </div>

      <style jsx>{`
        /* ::::: Card ::::: */
        .card {
          width: 100%;
          max-width: 600px;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 12px #00b0ff55, 0 4px 24px #00000088;
          border-color: #00b0ff;
        }

        /* ::::: Image wrapper keeps 3:2 ratio ::::: */
        .thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2; /* 600 × 400 at max width */
        }

        /* ::::: Content ::::: */
        .content {
          padding: 0.9rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .title {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
          text-decoration: none;
        }
        .title:hover {
          text-decoration: underline;
        }

        .meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.8rem;
          opacity: 0.85;
        }

        .score,
        .comments,
        .time,
        .author {
          white-space: nowrap;
        }

        /* ::::: Mobile tweaks ::::: */
        @media (max-width: 640px) {
          .title {
            font-size: 0.95rem;
          }
          .meta {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </article>
  );
}
