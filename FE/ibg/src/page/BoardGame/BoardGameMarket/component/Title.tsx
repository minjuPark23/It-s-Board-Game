import { Box, Typography } from "@mui/material";

export default function Title() {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: "bold",
        }}
        color="error"
      >
        B
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: "bold",
        }}
      >
        oard&nbsp;
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: "bold",
        }}
        color="#FCB500"
      >
        G
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: "bold",
        }}
      >
        ame&nbsp;
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: "bold",
        }}
        color="primary"
      >
        M
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: "bold",
        }}
      >
        arket
      </Typography>
    </Box>
  );
}
