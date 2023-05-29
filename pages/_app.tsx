import "@/styles/globals.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const toastStyles = {
  style: {
    borderRadius: "25px",
    paddingLeft: "15px",
    background: "hsla(240,11%,20%, 0.9)",
    backdropFilter: "blur(10px)",
    color: "hsl(240,11%,90%)",
  },
  iconTheme: {
    primary: "hsl(240,11%,90%)",
    secondary: "hsl(240,11%,30%)",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>mGPT</title>
      </Head>
      <Toaster />
      <Component {...pageProps} />
      <CssBaseline />
    </ThemeProvider>
  );
}
