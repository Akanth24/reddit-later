import { signOut } from "aws-amplify/auth";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <button className="signout-button" onClick={handleSignOut}>
        Sign Out
      </button>

      <style jsx>{`
        .signout-button {
          background-color: #111;
          color: #fff;
          padding: 0.6rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 2px rgba(255,255,255);
          letter-spacing: 0.5px;
        }

        .signout-button:hover {
          box-shadow: 0 0 16px rgba(255,255,255);
          background-color: #000;
        }

        .signout-button:active {
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
};

export default SignOut;
