"use client";
import "../styles/globals.css";

import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "../styles/auth.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const customTheme = {
  name: "custom-black-white",
  tokens: {
    colors: {
      background: {
        primary: "#000000",
        secondary: "#111111",
        tertiary: "#1a1a1a",
      },
      font: {
        primary: "#ffffff",
        secondary: "#cccccc",
        interactive: "#ffffff",
      },
      border: {
        primary: "#333333",
      },
      brand: {
        primary: {
          10: "#ffffff",
          80: "#ffffff",
        },
      },
    },
    radii: {
      small: "8px",
      medium: "12px",
      large: "9999px",
    },
  },
};

export default function App({ Component, pageProps }) {
  const skipAuth = Component.auth === false;

  return (
    <ThemeProvider theme={customTheme}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "black",
          color: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "200vh",
            transformOrigin: "center",
            pointerEvents: "none",
            backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.2) 2px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.2) 2px, transparent 1px)
        `,
            backgroundSize: "40px 40px",
            zIndex: 0,
            animation: "growShrink 16s ease-in-out infinite",
          }}
        />

        {/* --- PAGE CONTENT --- */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {skipAuth ? (
            <Component {...pageProps} />
          ) : (
            <Authenticator>
              <Component {...pageProps} />
            </Authenticator>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes growShrink {
          0% {
            transform: scale(0.9);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.55;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.25;
          }
        }
      `}</style>
    </ThemeProvider>
  );
}
