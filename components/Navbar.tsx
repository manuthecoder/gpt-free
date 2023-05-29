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
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

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
          background: "hsl(240,11%,14%)",
        }}
      >
        <Toolbar sx={{ height: "64px" }}>
          <NoSsr>
            <Typography
              sx={{ display: "flex", gap: 2, mr: "auto", alignItems: "center" }}
            >
              <Icon>south_east</Icon>mGPT <Chip label="v2.0" size="small" />
            </Typography>
          </NoSsr>
          <IconButton onClick={() => setOpen(true)}>
            <Icon>info</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
