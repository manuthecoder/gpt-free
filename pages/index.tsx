import {
  AppBar,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Icon,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import remarkGfm from "remark-gfm";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import { History } from "@/components/History";
import { toast } from "react-hot-toast";
import { toastStyles } from "./_app";

interface Chat {
  prompt: string;
  response: string;
}

function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: "64px",
        background: "hsl(240,11%,14%)",
      }}
    >
      <Toolbar sx={{ height: "64px" }}>
        <Typography sx={{ display: "flex", gap: 2, mr: "auto" }}>
          <Icon>south_east</Icon>mGPT
        </Typography>
        <IconButton>
          <Icon>info</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

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
      try {
        setLoading(true);

        const data: any = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ prompt }),
        }).then((res) => res.text());

        const current = [...history, { prompt, response: data }];
        console.log("Current: ", current);
        setHistory(current);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    },
    [history, prompt]
  );

  const ref: any = useRef();

  useEffect(() => {
    setResponse(history[history.length - 1]);
    ref.current.select();
    setTimeout(() => {
      document.querySelector("#response")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, [history]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Grid container sx={{ mt: "64px", height: "calc(100vh - 64px)" }}>
        <Grid
          item
          xs={12}
          sm={response ? 6 : 12}
          sx={{
            maxHeight: "calc(100vh - 64px)",
            overflow: "auto",
            flexDirection: "column",
            py: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: history.length > 0 ? "" : "center",
            width: "100%",
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
              disabled={loading}
              inputRef={ref}
              autoFocus
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
                ...(loading && {
                  background: "rgba(255,255,255,0.05)!important",
                }),
                transform: `rotate(${
                  deferredPrompt.trim() !== "" ? "90deg" : "0deg"
                })`,
                transition: "transform .2s, opacity .2s",
              }}
              disabled={deferredPrompt.trim() == "" || loading}
            >
              {loading ? (
                <CircularProgress size={24} thickness={6} color="inherit" />
              ) : (
                <Icon>arrow_upward</Icon>
              )}
            </IconButton>
          </Box>
          <Box
            sx={{
              display: history.length > 0 ? "none" : "flex",
              gap: 2,
              flexWrap: "wrap",
              maxWidth: "100%",
              width: "500px",
              alignItems: "center",
              // justifyContent: "center",
              px: 2,
              overflowX: "auto",
            }}
          >
            {[
              "What is the meaning of life?",
              "Explain quantum computing in simple terms",
              "Got any creative ideas for a 10 year old's birthday?",
              "How do I make an HTTP request in Javascript?",
            ].map((prompt) => (
              <Chip
                icon={<Icon>search</Icon>}
                onClick={() => setPrompt(prompt)}
                label={prompt}
                key={prompt}
              />
            ))}
          </Box>

          {history.length > 0 && (
            <History
              setHistory={setHistory}
              loading={loading}
              history={history}
              setPrompt={setPrompt}
              setResponse={setResponse}
            />
          )}
        </Grid>
        {response && (
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              borderLeft: "2px solid hsl(240,11%,14%)",
              maxHeight: "calc(100vh - 64px)",
              overflow: "auto",
            }}
          >
            <Box sx={{ p: 4 }}>
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  fontWeight: 700,
                  color: "hsl(240,11%,80%)",
                }}
                variant="h6"
              >
                <Icon>south_east</Icon>You
              </Typography>
              <div className="prose lg:prose-xl prose-dark prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget="_blank">
                  {response.prompt}
                </ReactMarkdown>
              </div>
              <Typography
                id="response"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 4,
                  mb: 1,
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #007AFF, #00FFA3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradient .3s ease infinite",
                }}
                variant="h6"
              >
                <Icon>south_east</Icon>mGPT
              </Typography>
              <div className="prose lg:prose-xl prose-dark prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget="_blank">
                  {response.response}
                </ReactMarkdown>
              </div>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
