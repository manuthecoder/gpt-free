import { useOnlineStatus } from "@/lib/useOnlineStatus";
import "@/styles/globals.css";
import {
  Backdrop,
  createTheme,
  CssBaseline,
  Icon,
  NoSsr,
  ThemeProvider,
  Typography,
} from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            background: "hsl(240,11%,16%)",
            "&:hover": {
              background: "hsl(240,11%,18%)",
            },
          }),
      },
    },
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
  const isOnline = useOnlineStatus();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>mGPT</title>
      </Head>
      <Toaster />
      <Component {...pageProps} />
      <CssBaseline />
      <NoSsr>
        <Backdrop
          open={!isOnline}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              background: "hsla(240,11%,12%,0.6)!important",
              gap: 2,
            }}
          >
            <Icon>cloud_off</Icon>
            <span className="font-serif">You&apos;re offline</span>
          </Typography>
        </Backdrop>
      </NoSsr>
    </ThemeProvider>
  );
}
