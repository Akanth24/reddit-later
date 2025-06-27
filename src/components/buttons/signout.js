import { signOut } from "aws-amplify/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
        <span className="label">Sign Out</span>
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
          box-shadow: 0 0 2px rgba(255, 255, 255);
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .signout-button:hover {
          box-shadow: 0 0 16px rgba(255, 255, 255);
          background-color: #000;
        }

        .signout-button:active {
          transform: scale(0.97);
        }

        .icon {
          font-size: 1.1rem;
        }

        .label {
          display: inline;
        }

        @media (max-width: 480px) {
          .signout-button {
            padding: 0.6rem 0.9rem;
            font-size: 0.95rem;
          }

          .label {
            display: none;
          }

          .icon {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
};

export default SignOut;
