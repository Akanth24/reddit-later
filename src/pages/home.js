import React, { useState, useEffect } from "react";
import SignOut from "@/components/buttons/signout";
import { getCurrentUser } from "aws-amplify/auth";
import saveInterests from "@/utils/saveInterests";

const subredditsList = [
  "technology",
  "worldnews",
  "javascript",
  "dataisbeautiful",
  "askscience",
  "productivity",
  "programming",
];

export default function HomePage() {
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");

  // Get userId on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { username } = await getCurrentUser();
        setUserId(username);
      } catch (err) {
        console.error("Failed to get user:", err);
      }
    };
    fetchUser();
  }, []);

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
    const sub = e.dataTransfer.getData("text");
    toggleSubreddit(sub);
  };

  const filteredSuggestions = subredditsList.filter(
    (s) =>
      s.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSubs.includes(s)
  );

  const handleSave = async () => {
    if (!userId) {
      alert("User not signed in.");
      return;
    }

    const message = await saveInterests(userId, selectedSubs);
    alert(message);
  };

  return (
    <main className="home-container">
      <div className="signout-wrapper">
        <SignOut />
      </div>

      <h1 className="heading">Welcome to Reddit Later 👋</h1>
      <p className="subtitle">Choose topics & get weekly summaries</p>

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

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem 4rem;
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
    </main>
  );
}
