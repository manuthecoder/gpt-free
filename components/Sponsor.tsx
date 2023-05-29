import { Box, Icon, Typography } from "@mui/material";

export function Sponsor() {
  return (
    <Box
      sx={{
        width: "500px",
        maxWidth: "calc(100% - 50px)",
        background: "hsl(240,11%,15%)",
        "&:hover": {
          background: "hsl(240,11%,17%)",
        },
        "&:active": {
          transition: "none",
          transform: "scale(0.97)",
        },
        transition: "transform .2s",
        borderRadius: 5,
        px: 3,
        py: 2,
        mt: "auto",
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
      }}
      onClick={() => window.open("https://dysperse.com?utm_source=mgpt")}
    >
      <Typography variant="caption" gutterBottom>
        SPONSORED
      </Typography>
      <Box sx={{ display: "flex", alignItems: "end" }}>
        <Box>
          <Typography gutterBottom>
            Say hello to your new productivity weapon.
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", gap: 0.5 }}>
            dysperse.com
            <Icon sx={{ fontSize: "20px!important" }}>north_east</Icon>
          </Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <picture>
            <img
              src="https://assets.dysperse.com/v5/ios/114.png"
              width="50px"
              loading="lazy"
              alt="logo"
            />
          </picture>
        </Box>
      </Box>
    </Box>
  );
}
