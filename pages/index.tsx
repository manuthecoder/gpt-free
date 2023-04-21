import Head from "next/head";
import {
  useState,
  useDeferredValue,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Typography,
  Collapse,
  InputAdornment,
  TextField,
  Skeleton,
  Alert,
  Link,
  IconButton,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-hot-toast";

export default function Home() {
  const ref: any = useRef();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const deferredValue = useDeferredValue(value);

  const handleChange = useCallback((e: any) => {
    let str = e.target.value.substring(0, 3000);
    if (str.length === 1) str = str.toUpperCase();
    setValue(str);
  }, []);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      if (deferredValue.trim() == "") return;
      setLoading(true);

      const data = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ prompt: deferredValue }),
      }).then((res) => res.json());

      setLoading(false);

      setResponse(data);
    } catch (e) {
      toast.error(
        "Yikes! mGPT could not think properly (possible because we are at capacity)! Please try again later"
      );
      setLoading(false);
      setResponse(null);
    }
  }, [deferredValue]);

  return (
    <>
      <Head>
        <title>mGPT &bull; Manu&apos;s mini ChatGPT clone</title>
        <meta
          name="description"
          content="mGPT is a mini, unblocked lightweight ChatGPT clone"
        />{" "}
        <meta name="theme-color" content="#17171c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#17171c",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            width: "500px",
            maxWidth: "calc(100vw - 30px)",
            display: "flex",
            gap: 2,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: { xs: "end", sm: "center" },
            height: "calc(100vh - 50px)",
          }}
        >
          <TextField
            inputRef={ref}
            multiline
            fullWidth
            value={value}
            placeholder="Ask mGPT..."
            variant="standard"
            maxRows={5}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.shiftKey && e.key === "Enter") {
                setValue(value + "\n");
                e.preventDefault();
              } else if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={loading}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    height: "100%",
                    mt: "auto",
                  }}
                >
                  {deferredValue !== "" && (
                    <IconButton
                      sx={{
                        background: "transparent",
                        transition: "none",
                        mr: 1.5,
                        opacity: 0.6,
                      }}
                      size="small"
                      onClick={() => {
                        setValue("");
                        setResponse(null);
                      }}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </IconButton>
                  )}
                  <LoadingButton
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={deferredValue.trim() == ""}
                    color="inherit"
                    sx={{
                      background: "hsl(240,11%,17%)!important",
                      "&:hover": {
                        background: "hsl(240,11%,17%)",
                      },
                      "&:active": {
                        transform: "scale(.97)",
                      },
                      transition: "scale .2s",
                      px: 2,
                      borderRadius: 999,
                    }}
                  >
                    Send
                  </LoadingButton>
                </InputAdornment>
              ),
              sx: {
                fontSize: { xs: "17px", sm: "20px" },
                p: 2,
                background: "hsl(240,11%,13%)",
                border: "1px solid hsl(240,11%,20%)",
                borderRadius: 3,
              },
            }}
          />

          <Box
            sx={{
              order: -1,
              textAlign: "center",
              display: {
                xs: Boolean(response) ? "none" : "flex",
                sm: "flex",
              },
              height: { xs: "100%", sm: "auto" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center" },
            }}
          >
            <Typography sx={{ mb: 1 }} variant="h2">
              mGPT
            </Typography>
            <Typography gutterBottom>
              Mini ChatGPT clone built by{" "}
              <Link href="https://linkedin.com/in/manu-codes">
                Manu
                <span
                  style={{
                    verticalAlign: "middle",
                    marginLeft: "4px",
                  }}
                  className="material-symbols-outlined"
                >
                  north_east
                </span>
              </Link>
            </Typography>
          </Box>
          <Collapse
            in={Boolean(response) || loading}
            orientation="vertical"
            sx={{
              order: { xs: -1, sm: 0 },
              borderRadius: 3,
              width: "100%",
              overflowY: "scroll",
              height: { xs: "100%", sm: "auto" },
              flexGrow: { xs: 1, sm: "unset" },
              maxHeight: "100%",
              fontSize: "17px",
              background: "hsl(240,11%,13%)",
              border: "1px solid hsl(240,11%,20%)",
            }}
          >
            <Box
              sx={{
                p: 2,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 1,
                  color: "#46b528",
                  fontWeight: "700",
                }}
              >
                <span className="material-symbols-outlined">south_east</span>
                mGPT
              </Typography>
              {loading ? (
                <Box>
                  <Skeleton animation="wave" width="70%" />
                  <Skeleton animation="wave" width="100%" />
                  <Skeleton animation="wave" width="90%" />
                  <Skeleton animation="wave" width="80%" />

                  <Alert severity="info" sx={{ mt: 2, borderRadius: 5 }}>
                    <Typography>While you wait...</Typography>
                    <Typography variant="body2">
                      Check out <Link target="_blank">Dysperse</Link>, and how
                      it can increase your productivity for free!
                    </Typography>
                  </Alert>
                </Box>
              ) : (
                response &&
                response.response && (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response.response.replaceAll("Raycast AI", "mGPT")}
                  </ReactMarkdown>
                )
              )}
            </Box>
          </Collapse>
        </Box>
      </Box>
    </>
  );
}
