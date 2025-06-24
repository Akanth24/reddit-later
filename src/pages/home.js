"use client";
import React, { useState, useEffect } from "react";
import SignOut from "@/components/buttons/signout";
import { getCurrentUser } from "aws-amplify/auth";
import saveInterests from "@/utils/user/saveInterests";
import getUserInterests from "@/utils/user/getUserInterests";

const subredditsList = [
  "technology",
  "worldnews",
  "javascript",
  "dataisbeautiful",
  "askscience",
  "productivity",
  "programming",
];

export default function Home() {
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  /** Fetch Cognito user */
  const fetchUserSignIn = async () => {
    try {
      const user = await getCurrentUser();
      setUserId(user.userId ?? "");
      setUserEmail(user.signInDetails.loginId ?? "");
    } catch (err) {
      console.error("Fetch user signIn details error:", err);
    }
  };
  useEffect(() => {
    fetchUserSignIn();
  }, []);

  //**  any saved interests on first render */
  const fetchUserInterests = async (userId) => {
    try {
      const saved = await getUserInterests(userId);
      setSelectedSubs(saved);
    } catch (err) {
      console.error("Fetching user interests error:", err);
    }
  };

  useEffect(() => {
    fetchUserInterests(userId);
  }, [userId]);

  /* ——— UI helpers ——— */
  const toggleSubreddit = (sub) => {
    if (!sub) return;
    setSelectedSubs((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      toggleSubreddit(searchTerm.trim().toLowerCase());
      setSearchTerm("");
    }
  };

  const handleDragStart = (e, sub) => {
    e.dataTransfer.setData("text/plain", sub);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    toggleSubreddit(e.dataTransfer.getData("text"));
  };

  const filteredSuggestions = subredditsList.filter(
    (s) =>
      s.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSubs.includes(s)
  );

  /* ——— Save to backend ——— */
  const handleSave = async () => {
    if (!userId) return alert("User not signed in.");
    const msg = await saveInterests(userId, selectedSubs);
    alert(msg);
  };

  return (
    <div className="home-container">
      <div className="nav-container">
        <div className="user-email">Hello !! {userEmail}</div>
        <div className="signout-wrapper">
          <SignOut />
        </div>
      </div>

      <h1 className="heading">Welcome to Reddit Later 👋</h1>
      <p className="subtitle">Choose topics &amp; get weekly summaries</p>

      {/* Glowing Search Bar */}
      <div
        className="search-bar"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {selectedSubs.map((sub) => (
          <span className="chip" key={sub}>
            r/{sub}
            <button
              className="remove"
              aria-label={`remove ${sub}`}
              onClick={() => toggleSubreddit(sub)}
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      {/* Suggestions */}
      <ul className="suggestions">
        {filteredSuggestions.map((sub) => (
          <li
            key={sub}
            className="suggest-item"
            draggable
            onDragStart={(e) => handleDragStart(e, sub)}
            onClick={() => toggleSubreddit(sub)}
          >
            r/{sub}
          </li>
        ))}
      </ul>

      <button className="save-button" onClick={handleSave}>
        Save Preferences
      </button>

      {/* ——— styles unchanged ——— */}
      <style jsx>{`
        .home-container {
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 5rem;
        }

        .nav-container {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .user-email {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .signout-wrapper {
          align-self: flex-end;
        }

        .heading {
          font-size: 2.25rem;
          text-align: center;
          margin: 2rem 0 0.25rem;
        }

        .subtitle {
          margin-bottom: 2.5rem;
          opacity: 0.8;
          font-size: 1rem;
        }

        .search-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: 1px solid #333;
          border-radius: 9999px;
          background: #111;
          box-shadow: 0 0 8px #ffffff44;
          max-width: 600px;
          width: 100%;
          transition: box-shadow 0.25s ease;
        }

        .search-bar:focus-within {
          box-shadow: 0 0 14px #ffffffaa;
        }

        .search-bar input {
          flex: 1;
          min-width: 140px;
          background: transparent;
          border: none;
          color: #fff;
          outline: none;
          font-size: 1rem;
        }

        .chip {
          display: flex;
          align-items: center;
          background: #0070f3;
          color: #fff;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        .chip .remove {
          background: none;
          border: none;
          color: #fff;
          margin-left: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          line-height: 1;
        }

        .suggestions {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem;
          max-width: 600px;
          width: 100%;
        }

        .suggest-item {
          padding: 0.5rem 1rem;
          background: #111;
          border: 1px solid #333;
          border-radius: 9999px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .suggest-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 8px #ffffff55;
        }

        .suggest-item:active {
          transform: scale(0.97);
        }

        .save-button {
          padding: 0.9rem 2.25rem;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: box-shadow 0.25s ease;
        }

        .save-button:hover {
          box-shadow: 0 0 12px #ffffffaa;
        }
      `}</style>
    </div>
  );
}

Home.auth = true; // tells _app.js this route needs auth
