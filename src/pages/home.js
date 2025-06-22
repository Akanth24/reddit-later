export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to News Summary App</h1>
      <p>Select your interests to get daily email updates.</p>
      <style jsx>{`
        .container {
          padding: 2rem;
          font-family: sans-serif;
        }
        h1 {
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}