import {
  AppBar,
  Box,
  Chip,
  Divider,
  Icon,
  IconButton,
  Link,
  NoSsr,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function Navbar({
  loading,
  response,
  setHistory,
  setPrompt,
  setResponse,
  mobilePage,
  setMobilePage,
}: any) {
  const [open, setOpen] = useState(false);

  useHotkeys(
    "escape",
    (e) => {
      e.preventDefault();
      setMobilePage("history");
      setHistory([]);
      setResponse(null);
      setPrompt("");
    },
    {
      enableOnFormTags: true,
    }
  );
  

  useEffect(() => {
    document
      .querySelector(`meta[name="theme-color"]`)
      ?.setAttribute("content", `hsl(240,11%,${response ? 14 : 12}%)`);
  });

  return (
    <>
      <SwipeableDrawer
        disableSwipeToOpen
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => {}}
        PaperProps={{
          sx: {
            boxShadow: 0,
            maxWidth: "500px",
            borderRadius: "20px 20px 0 0",
            mx: "auto",
          },
        }}
        BackdropProps={{
          sx: {
            background: "hsla(240,11%,12%,0.5)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" className="font-serif">
            mGPT
          </Typography>
          <Typography sx={{ mt: 1 }}>Version 2.0</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">
            This is a mini clone of{" "}
            <Link href="https://chat.openai.com" target="_blank">
              ChatGPT
            </Link>{" "}
            made by{" "}
            <Link href="https://linkedin.com/in/manu-codes" target="_blank">
              Manu
            </Link>
            . The author of this project is not responsible for any misuse of
            this project. This project is not affiliated with OpenAI.
          </Typography>
        </Box>
      </SwipeableDrawer>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: "64px",
          background: `hsl(240,11%,${response ? 14 : 12}%)`,
        }}
      >
        <NoSsr>
          <Toolbar sx={{ height: "64px" }}>
            <IconButton
              onClick={() => setMobilePage("history")}
              sx={{
                display: {
                  xs: mobilePage === "history" ? "none" : "flex",
                  sm: "none",
                },
              }}
            >
              <Icon>west</Icon>
            </IconButton>
            <IconButton
              disabled={loading}
              onClick={() => {
                setMobilePage("history");
                setHistory([]);
                setResponse(null);
                setPrompt("");
              }}
              sx={{ display: { xs: "none", sm: response ? "flex" : "none" } }}
            >
              <Icon>close</Icon>
            </IconButton>
            <Typography
              sx={{
                display: "flex",
                pl: 1,
                gap: 2,
                mr: "auto",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #007AFF, #00FFA3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradient .3s ease infinite",
                  fontWeight: 700,
                }}
              >
                mGPT
              </span>{" "}
              <Chip label="v2.0" size="small" />
            </Typography>
            <IconButton onClick={() => setOpen(true)}>
              <Icon>help</Icon>
            </IconButton>
          </Toolbar>
        </NoSsr>
      </AppBar>
    </>
  );
}
