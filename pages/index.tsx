import {
  Icon,
  Box,
  AppBar,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Chip,
} from "@mui/material";
import { useCallback, useDeferredValue, useState } from "react";

interface Chat {
  prompt: string;
  response: string;
}

function History({ history }: any) {
  return (
    <Box
      sx={{
        width: "500px",
        background: "hsl(240,11%,15%)",
        maxWidth: "calc(100vw - 20px)",
        borderRadius: 5,
        px: 3,
        py: 2,
        maxHeight: "100%",
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>History</Typography>
      {history.map((item: any, index: number) => (
        <Chip label={item.prompt} key={index} icon={<Icon>history</Icon>} />
      ))}
    </Box>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState("");
  const handleChange = (e: any) => {
    if (prompt.length == 0) {
      setPrompt(e.target.value.toUpperCase());
    } else {
      setPrompt(e.target.value);
    }
  };
  const deferredPrompt = useDeferredValue(prompt);

  const [history, setHistory] = useState<Chat[]>([]);
  const [response, setResponse] = useState<null | Chat>(null);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (prompt.trim() == "") return;

      const data: any = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      }).then((res) => res.text());

      const current = [...history, { prompt, response: data }];
      console.log("Current: ", current);
      setHistory(current);
      console.log("History: ", history);
    },
    [history, prompt]
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "hsl(240,11%,14%)",
        }}
      >
        <Toolbar>
          <Typography>mGPT</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} sm={response ? 6 : 12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100vh",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: "500px",
                background: "hsl(240,11%,15%)",
                maxWidth: "calc(100vw - 20px)",
                display: "flex",
                borderRadius: 5,
                px: 3,
                py: 2,
                maxHeight: "100%",
                alignItems: "center",
              }}
            >
              <TextField
                value={prompt}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (!e.shiftKey && e.code == "Enter") handleSubmit(e);
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "20px",
                    fontWeight: 600,
                  },
                }}
                maxRows={5}
                variant="standard"
                placeholder="Ask mGPT..."
                fullWidth
                multiline
              />
              <IconButton
                onClick={handleSubmit}
                sx={{
                  mt: "auto",
                  ...(deferredPrompt.trim() !== "" && {
                    background: "#007AFF!important",
                  }),
                  transform: `rotate(${
                    deferredPrompt.trim() !== "" ? "90deg" : "0deg"
                  })`,
                  transition: "transform .2s, opacity .2s",
                }}
                disabled={deferredPrompt.trim() == ""}
              >
                <Icon>arrow_upward</Icon>
              </IconButton>
            </Box>

            <History history={history} />
          </Box>
        </Grid>
        {response && (
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              borderLeft: "2px solid hsl(240,11%,14%)",
            }}
          >
            Hi
          </Grid>
        )}
      </Grid>
    </>
  );
}
