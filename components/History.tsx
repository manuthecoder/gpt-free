import {
  Box,
  Button,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export function History({
  setHistory,
  loading,
  history,
  setPrompt,
  setResponse,
}: any) {
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
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
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
      <Box>
        {history
          .slice()
          .reverse()
          .map((item: any, index: number) => (
            <Box key={index}>
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
            </Box>
          ))}
      </Box>
    </Box>
  );
}
