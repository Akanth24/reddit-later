'use client';
import { signOut } from 'aws-amplify/auth';

export default function Home() {
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload(); // Optional: resets Authenticator
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Reddit Weekly Digest 🎉</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
