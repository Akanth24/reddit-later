import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import fetchSubreddits from "@/utils/reddit/fetchSubreddits";

const getRandomSuggestions = (subs, count = 20) =>
  [...subs].sort(() => 0.5 - Math.random()).slice(0, count);

export default function SubredditPicker({ selectedSubs, setSelectedSubs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allSubreddits, setAllSubreddits] = useState([]);
  const [randomSubs, setRandomSubs] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setLoadingSubs(true);
        const subs = await fetchSubreddits();
        setAllSubreddits(subs);
        setRandomSubs(getRandomSuggestions(subs, 20));
        setLoadingSubs(false);
      };
      fetchData();
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
    toggleSubreddit(e.dataTransfer.getData("text"));
  };

  const filteredSuggestions = allSubreddits.filter(
    (s) =>
      s.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSubs.includes(s)
  );

  return (
    <div className="container">
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

      {/* Suggestions or loader */}
      {loadingSubs ? (
        <div className="loader-wrapper">
          <LoadingScreen />
        </div>
      ) : (
        <ul className="suggestions">
          {(searchTerm ? filteredSuggestions : randomSubs).map((sub) => (
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
      )}

      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 1rem;
        }

        .search-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: 1px solid #444;
          border-radius: 2rem;
          background: #181818;
          box-shadow: 0 0 8px #ffffff22;
          max-width: 720px;
          width: 100%;
        }

        .search-bar:focus-within {
          box-shadow: 0 0 12px #ffffff55;
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
          background: linear-gradient(135deg, #0070f3, #00b0ff);
          color: #fff;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chip .remove {
          background: none;
          border: none;
          color: #fff;
          margin-left: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
        }

        .suggestions {
          list-style: none;
          padding: 0;
          margin: 2rem auto 1.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          max-width: 1000px;
          max-height: 11rem; /* ~4 lines with spacing */
          overflow-y: auto;
          scrollbar-width: thin;
          padding: 0 0.5rem;
        }

        .suggestions::-webkit-scrollbar {
          width: 6px;
        }

        .suggestions::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }

        .suggest-item {
          padding: 0.4rem 0.85rem;
          background: #222;
          border: 1px solid #333;
          border-radius: 9999px;
          color: #fff;
          font-size: 0.875rem;
          cursor: pointer;
          user-select: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .suggest-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 10px #ffffff33;
        }

        .suggest-item:active {
          transform: scale(0.96);
        }

        .loader-wrapper {
          margin: 2rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 120px;
        }
      `}</style>
    </div>
  );
}
