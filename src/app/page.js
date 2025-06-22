"use client";
import { useRouter } from "next/navigation";
import "../styles/landing.css";

export default function Landing() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/home");
  };

  return (
    <main className="landing">
      {/* Hero Section */}
      <section className="hero">
        <h1>Reddit Later</h1>
        <p>Don't Read it Later!!! - Read it Weekly</p>
        <p>Get the latest discussion summaries from your favorite topics.</p>
        <button onClick={handleLogin}>Login</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-inner">
          <h2 className="section-heading">Features</h2>
          <div className="feature-blocks">
            <div className="feature-card"><p>Weekly top Reddit posts, straight to your inbox</p></div>
            <div className="feature-card"><p>Choose your favorite topics</p></div>
            <div className="feature-card"><p>AI-powered summaries for faster reading</p></div>
            <div className="feature-card"><p>Easy sign-up with email</p></div>
            {/* <div className="feature-card"><p>Privacy-first: no data shared</p></div> */}
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-inner">
          <h2 className="section-heading">How It Works</h2>
          <div className="how-it-works-steps">
            <div className="how-step">
              <h3>1. Login</h3>
              <p>Sign in with your email to get started.</p>
            </div>
            <div className="how-step">
              <h3>2. Choose Topics</h3>
              <p>Select your favorite subreddits or interest areas.</p>
            </div>
            <div className="how-step">
              <h3>3. Get Weekly Digest</h3>
              <p>Receive a beautifully summarized email every week.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="screenshots">
        <div className="section-inner">
          <h2 className="section-heading">Sneak Peek</h2>
          <div className="screenshot-card">
            <p>[ Screenshot or UI Mockup Placeholder ]</p>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <p>Made with 💌 • <a href="https://github.com/Akanth24/reddit-later" target="_blank">GitHub</a></p>
      </footer>
    </main>
  );
}
