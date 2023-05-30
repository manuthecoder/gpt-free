import { History } from "@/components/History";
import { Navbar } from "@/components/Navbar";
import { Sponsor } from "@/components/Sponsor";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  Icon,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Chat {
  prompt: string;
  response: string;
}

export default function App() {
  const [mobilePage, setMobilePage] = useState<"history" | "chat">("history");
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
  const [response, setResponse] = useState<"loading" | null | Chat>(null);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (prompt.trim() == "") return;
      try {
        setLoading(true);
        setResponse("loading");
        setMobilePage("chat");

        const data: any = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ prompt }),
        }).then((res) => res.text());

        const current = [...history, { prompt, response: data }];
        console.log("Current: ", current);
        setHistory(current);
        setLoading(false);
      } catch (e) {
        toast.error("Yikes! mGPT couldn't think! Please try again later.");
        setMobilePage("history");
        setLoading(false);
        setResponse(null);
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
      <Navbar
        response={response}
        setHistory={setHistory}
        mobilePage={mobilePage}
        setMobilePage={setMobilePage}
        setPrompt={setPrompt}
        setResponse={setResponse}
        loading={loading}
      />
      <Grid
        container
        sx={{
          mt: "64px",
          height: "calc(100vh - 64px)",
          background: "hsl(240, 11%, 10%)",
        }}
      >
        <Grid
          item
          xs={12}
          sm={response ? 4 : 12}
          sx={{
            maxHeight: "calc(100vh - 64px)",
            overflow: "auto",
            flexDirection: "column",
            py: 4,
            display: {
              xs: mobilePage == "history" ? "flex" : "none",
              sm: "flex",
            },
            alignItems: "center",
            justifyContent: history.length > 0 ? "" : "center",
            background: `hsl(240, 11%, ${response ? 12 : 10}%)`,
            width: "100%",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "500px",
              background: "hsl(240,11%,15%)",
              maxWidth: "calc(100% - 50px)",
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
                <Icon>
                  {response &&
                  response !== "loading" &&
                  prompt == response.prompt
                    ? "autorenew"
                    : "arrow_upward"}
                </Icon>
              )}
            </IconButton>
          </Box>
          <Box
            sx={{
              display: history.length > 0 ? "none" : "flex",
              gap: 2,
              flexWrap: "wrap",
              width: "500px",
              maxWidth: "calc(100% - 50px)",
              alignItems: "center",
              // justifyContent: "center",
              px: 2,
              overflowX: "auto",
            }}
          >
            {[
              "Write a paragraph about the history of the United States",
              "Explain quantum computing in simple terms",
              "Got any creative ideas for a 10 year old's birthday?",
              "How do I make an HTTP request in Javascript?",
            ].map((prompt) => (
              <Chip
                disabled={loading}
                icon={<Icon>search</Icon>}
                onClick={() => setPrompt(prompt)}
                label={prompt}
                key={prompt}
              />
            ))}
          </Box>

          {history.length > 0 && (
            <History
              setMobilePage={setMobilePage}
              setHistory={setHistory}
              loading={loading}
              history={history}
              setPrompt={setPrompt}
              setResponse={setResponse}
            />
          )}
          {response && <Sponsor />}
        </Grid>
        {response && (
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              borderLeft: "2px solid hsl(240,11%,12%)",
              maxHeight: "calc(100vh - 64px)",
              overflow: "auto",
              display: {
                xs: mobilePage == "chat" ? "block" : "none",
                sm: "block",
              },
              height: { xs: "calc(100vh - 64px)", sm: "100%" },
            }}
          >
            {response === "loading" ? (
              <Box sx={{ p: 3 }}>
                <Skeleton
                  variant="rectangular"
                  width="200px"
                  animation="wave"
                  height={50}
                  sx={{ borderRadius: 90, mb: 2 }}
                />
                {[...new Array(5)].map((_, i) => (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={30}
                    key={i}
                    sx={{ borderRadius: 90, mb: 2 }}
                  />
                ))}
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="200px"
                  height={50}
                  sx={{ mt: 4, mb: 2, borderRadius: 90 }}
                />
                {[...new Array(5)].map((_, i) => (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={30}
                    key={i}
                    sx={{ borderRadius: 90, mb: 2 }}
                  />
                ))}
              </Box>
            ) : (
              <Box sx={{ p: 3, pt: 4 }}>
                <Box
                  sx={{
                    background: "hsl(240,11%,15%)",
                    p: 3,
                    borderRadius: 5,
                    position: "relative",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      m: 3,
                      color: "hsl(240,11%,80%)",
                    }}
                    onClick={() => {
                      ref.current.focus();
                      setMobilePage("history");
                      ref.current.select();
                    }}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
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
                  <div
                    className="prose lg:prose-lg prose-dark prose-invert"
                    style={{
                      userSelect: "text",
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      linkTarget="_blank"
                    >
                      {response.prompt}
                    </ReactMarkdown>
                  </div>
                </Box>
                <Box
                  id="response"
                  sx={{
                    background: "hsl(240,11%,15%)",
                    p: 3,
                    mt: 4,
                    borderRadius: 5,
                    position: "relative",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      m: 3,
                      color: "hsl(240,11%,80%)",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(response.response);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <Icon>content_copy</Icon>
                  </IconButton>
                  <Typography
                    id="response"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 2,
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
                  <div
                    className="prose lg:prose-lg prose-dark prose-invert"
                    style={{
                      userSelect: "text",
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      linkTarget="_blank"
                    >
                      {response.response
                        .replaceAll("Raycast", "mGPT")
                        .replaceAll("raycast", "mGPT")}
                    </ReactMarkdown>
                  </div>
                </Box>
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}
