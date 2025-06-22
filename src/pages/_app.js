import { Amplify } from "aws-amplify";
import {
  Authenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "../styles/auth.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

// Define custom black & white theme
const customTheme = {
  name: "custom-black-white",
  tokens: {
    colors: {
      background: {
        primary: "#000000", // full background
        secondary: "#111111", // form area
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
  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator>
        <Component {...pageProps} />
      </Authenticator>
    </ThemeProvider>
  );
}
