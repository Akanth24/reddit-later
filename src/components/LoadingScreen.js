import React from "react";

export default function LoadingScreen({ size = 14, color = "#fff", title = "" }) {
  return (
    <div className="loader-container" role="status" aria-label="Loading...">
      <div className="dots-wrapper">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>

      {title && <div className="loading-title">{title}</div>}

      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: ${size * 0.75}px;
        }

        .dots-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${size * 0.75}px;
        }

        .dot {
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
          animation: bounce 0.6s infinite ease-in-out alternate;
        }

        .dot:nth-child(1) {
          animation-delay: 0.6s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.1s;
        }

        .dot:nth-child(3) {
          animation-delay: 1s;
        }

        .dot:nth-child(4) {
          animation-delay: 0.2s;
        }

        .loading-title {
          margin-top: 0.25rem;
          font-size: ${size * 1.2}px;
          color: ${color};
          animation: pulse-text 1.8s ease-in-out infinite;
        }

        @keyframes bounce {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }

        @keyframes pulse-text {
          0% {
            opacity: 0.6;
            transform: translateX(0px);
          }
          50% {
            opacity: 1;
            transform: translateX(4px);
          }
          100% {
            opacity: 0.6;
            transform: translateX(0px);
          }
        }
      `}</style>
    </div>
  );
}
