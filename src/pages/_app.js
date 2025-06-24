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
      {skipAuth ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            overflowY: "auto",
            transition: "all 0.3s ease",
          }}
        >
          <Component {...pageProps} />
        </div>
      ) : (
        <Authenticator>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              overflowY: "auto",
              transition: "all 0.3s ease",
            }}
          >
            <Component {...pageProps} />
          </div>
        </Authenticator>
      )}
    </ThemeProvider>
  );
}
