import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Landing() {
  const router = useRouter();
  const handleLogin = () => router.push("/home");

  const sectionsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleSections((prev) =>
              prev.includes(id) ? prev : [...prev, id]
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => {
      sectionsRef.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return (
    <div className="landing-container">
      {/* HERO */}
      <div className="hero-section">
        <div className="hero-title">Reddit Later</div>
        <div className="hero-tagline">
          Don&apos;t Read it Later!!! – Read it Weekly
        </div>
        <div className="hero-description">
          Get the latest discussion summaries from your favorite topics.
        </div>
        <button onClick={handleLogin} className="hero-button">
          Login
        </button>
      </div>

      {/* FEATURES */}
      <div
        className={`features-section ${
          visibleSections.includes("features") ? "fade-in" : "hidden-section"
        }`}
        data-id="features"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <h2 className="features-heading">Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <p>Weekly top Reddit posts, straight to your inbox</p>
          </div>
          <div className="feature-item">
            <p>Choose your favorite topics</p>
          </div>
          <div className="feature-item">
            <p>AI-powered summaries for faster reading</p>
          </div>
          <div className="feature-item">
            <p>Easy sign-up with email</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div
        className={`how-section ${
          visibleSections.includes("how") ? "fade-in" : "hidden-section"
        }`}
        data-id="how"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <h2 className="how-heading">How It Works</h2>
        <div className="how-steps">
          <div className="how-step">
            <h3 className="step-title">1. Login</h3>
            <p className="step-text">Sign in with your email to get started.</p>
          </div>
          <div className="how-step">
            <h3 className="step-title">2. Choose Topics</h3>
            <p className="step-text">Select your favorite subreddits.</p>
          </div>
          <div className="how-step">
            <h3 className="step-title">3. Get Weekly Digest</h3>
            <p className="step-text">Receive weekly summaries.</p>
          </div>
        </div>
      </div>

      {/* SNEAK PEEK */}
      <div
        className={`sneak-section ${
          visibleSections.includes("sneak") ? "fade-in" : "hidden-section"
        }`}
        data-id="sneak"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <h2 className="sneak-heading">Sneak Peek</h2>
        <div className="screenshot-card">
          <p>[ Screenshot or UI Mockup Placeholder ]</p>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className={`footer-section ${
          visibleSections.includes("footer") ? "fade-in" : "hidden-section"
        }`}
        data-id="footer"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <p className="footer-text">
          Made with 💌 •{" "}
          <a
            href="https://github.com/Akanth24/reddit-later"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </p>
      </div>

      <style jsx>{`
        .landing-container {
          color: #fff;
          overflow-x: hidden;
          width: "100%";
        }

        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 60px 30px;
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 1.2rem;
        }

        .hero-tagline,
        .hero-description {
          font-size: 1.25rem;
          color: #ccc;
          margin-bottom: 0.5rem;
        }

        .hero-description {
          max-width: 800px;
          margin-bottom: 2.4rem;
        }

        .hero-button {
          padding: 12px 32px;
          font-size: 1rem;
          background-color: white;
          color: black;
          border: none;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
        }

        .hero-button:hover {
          background-color: #e5e5e5;
          box-shadow: 0 0 24px rgba(255,255,255,0.8)
        }

        .features-section,
        .how-section,
        .sneak-section,
        .footer-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          padding: 40px 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .features-heading,
        .how-heading,
        .sneak-heading {
          font-size: 2rem;
          margin-bottom: 2.4rem;
          text-align: center;
        }

        .features-list {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          gap: 20px;
          justify-content: center;
        }

        .feature-item,
        .how-step,
        .screenshot-card {
          background-color: #1a1a1a;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #333;
          color: #ccc;
          min-width: 250px;
          text-align: center;
        }

        .how-steps {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .step-title {
          color: white;
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        .step-text {
          color: #ccc;
          font-size: 1.1rem;
        }

        .screenshot-card {
          font-size: 1.2rem;
        }

        .footer-text {
          font-size: 0.9rem;
          color: #fff;
          text-align: center;
        }

        .footer-link {
          color: #fff;
          text-decoration: underline;
        }

        .hidden-section {
          pointer-events: none;
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-tagline,
          .hero-description {
            font-size: 1rem;
          }

          .hero-description {
            margin-bottom: 20px;
            padding: 0 10px;
          }

          .hero-button {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .features-list {
            flex-direction: column;
            align-items: center;
          }

          .feature-item,
          .how-step,
          .screenshot-card {
            width: 100%;
            padding: 20px;
            min-width: unset;
          }

          .how-steps {
            flex-direction: column;
          }

          .features-section,
          .how-section,
          .sneak-section,
          .footer-section {
            padding: 50px 15px;
          }

          .features-heading,
          .how-heading,
          .sneak-heading {
            font-size: 1.6rem;
          }

          .step-title {
            font-size: 1.2rem;
          }

          .step-text {
            font-size: 1rem;
          }

          .footer-text {
            font-size: 0.8rem;
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
}

Landing.auth = false;
