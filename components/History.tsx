import {
  Box,
  Button,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Virtuoso } from "react-virtuoso";

export function History({
  setHistory,
  loading,
  setMobilePage,
  history,
  setPrompt,
  setResponse,
}: any) {
  const _history = history.slice().reverse();
  return (
    <Box
      sx={{
        width: "500px",
        maxWidth: "calc(100% - 50px)",
        background: "hsl(240,11%,15%)",
        borderRadius: 5,
        px: 3,
        py: 2,
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        height: { xs: "calc(100vh - 64px)", sm: "100%" },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          mb: 1,
          pb: 1.5,
          alignItems: "center",
          borderBottom: "1px solid hsl(240,11%,25%)",
        }}
      >
        <Typography sx={{ mr: "auto" }} variant="h6">
          History
        </Typography>
        <Button
          size="small"
          onClick={() => {
            setHistory([]);
            setPrompt("");
            setResponse("");
          }}
          disabled={loading}
          sx={{ textTransform: "none", borderRadius: 99 }}
        >
          Clear
        </Button>
      </Box>
      <Box
        sx={{
          height: "100%",
          flexGrow: 1,
        }}
      >
        <Virtuoso
          style={{ height: "100%" }}
          totalCount={_history.length}
          itemContent={(index) => {
            const item = _history[index];

            return (
              <ListItemButton
                disabled={loading}
                sx={{
                  borderRadius: 5,
                  minWidth: 0,
                  display: "flex",
                  transition: "none",
                }}
                onClick={() => {
                  setPrompt(item.prompt);
                  setResponse(item);
                  setMobilePage("chat");
                  setTimeout(() => {
                    document.querySelector("#response")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                }}
              >
                <ListItemIcon sx={{ flexShrink: 0, minWidth: 0 }}>
                  <Icon>history</Icon>
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ml: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  primary={item.prompt.substring(0, 100)}
                  secondary={`"${item.response.substring(0, 75)}"`}
                />
              </ListItemButton>
            );
          }}
        />
      </Box>
    </Box>
  );
}
