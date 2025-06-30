import React, { useEffect, useState } from "react";
import SignOut from "@/components/buttons/Signout";
import { getCurrentUser } from "aws-amplify/auth";
import saveInterests from "@/utils/user/saveInterests";
import getUserInterests from "@/utils/user/getUserInterests";
import PostFeed from "@/components/posts/PostsFeed";
import SubredditPicker from "@/components/SubredditPicker";
import LoadingScreen from "@/components/LoadingScreen";
import Swal from "sweetalert2";

export default function Home() {
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  /* ─── Cognito user ─── */
  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user.userId ?? "");
        setUserEmail(user.signInDetails.loginId ?? "");
      } catch (err) {
        console.error("Fetch user signIn details error:", err);
      } finally {
        setLoadingUser(false);
      }
    })();
  }, []);

  /* ─── interests ─── */
  useEffect(() => {
    if (userId) {
      getUserInterests(userId).then(setSelectedSubs).catch(console.error);
    }
  }, [userId]);

  const handleSave = async () => {
    if (!userId && !userEmail) return alert("User not signed in.");

    const msg = await saveInterests(userId, userEmail, selectedSubs);

    Swal.fire({
      icon: "success",
      title: "Preferences Saved!",
      text: msg || "Your topics have been saved.",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      background: "#111",
      color: "#fff",
      didOpen: () => {
        const content = Swal.getHtmlContainer();
        if (content) content.style.padding = "1rem";
      },
    });
  };

  /* ───────────────────────── UI ───────────────────────── */
  return (
    <>
      {loadingUser ? (
        <div className="centered">
          <LoadingScreen size={28} title="Welcome to Reddit Later" />
        </div>
      ) : (
        <div className="home-container">
          {/* ── NAV ─────────────────────────────── */}
          <header className="nav-container">
            <span className="user-email">Holaa !! {userEmail?.split('@')?.[0]}</span>
            <SignOut />
          </header>

          {/* ── HERO ────────────────────────────── */}
          <div className="heading-container">
            <div className="heading">Welcome to Reddit Later 👋</div>
            <div className="subtitle">Choose topics & get weekly summaries</div>
          </div>

          {/* ── PICKER + SAVE ───────────────────── */}
          <section className="search-container">
            <SubredditPicker
              selectedSubs={selectedSubs}
              setSelectedSubs={setSelectedSubs}
            />
            <button className="save-button" onClick={handleSave}>
              Save Preferences
            </button>
          </section>

          {/* ── FEED ─────────────────────────────── */}
          <PostFeed subs={selectedSubs} limit={20} timeframe="day" />
        </div>
      )}

      <style jsx>{`
        /* ===========  Base (desktop/tablet)  =========== */
        .home-container {
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          padding: 2rem 5rem;
        }

        .nav-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .user-email {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .heading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .heading {
          font-weight: 600;
          font-size: 2.4rem;
          text-align: center;
          margin: 2rem 0 0.25rem;
        }

        .subtitle {
          margin-bottom: 2.5rem;
          opacity: 0.8;
          font-size: 1rem;
        }

        .search-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .save-button {
          padding: 0.9rem 2.25rem;
          background: #f9f9f9;
          color: #000;
          border: none;
          border-radius: 100px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: box-shadow 0.25s ease;
        }
        .save-button:hover {
          box-shadow: 0 0 24px #ffffffaa;
        }

        .centered {
          height: 100dvh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* ===========  Mobile ≤480 px  =========== */
        @media (max-width: 480px) {
          .home-container {
            padding: 1.25rem 0.5rem;
            gap: 0rem;
          }

          .nav-container {
            flex-direction: row;
            padding: 0 1rem;
          }

          .user-email {
            font-size: 0.8rem;
          }

          .heading {
            font-size: 1.4rem;
            margin-top: 2rem;
          }

          .subtitle {
            font-size: 0.9rem;
            margin-bottom: 1rem;
            text-align: center;
          }

          .save-button {
            padding: 0.8rem 1.6rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}

Home.auth = true;
