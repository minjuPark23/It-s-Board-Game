import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function Title() {
  // 페이지 이동
  const navigate = useNavigate();

  // 페이지 이동
  const movePage = (page: string) => {
    navigate(page);
  };

  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        mt: { md: 1, xs: 7 },
        ml: { md: 44, xs: 4 },
        mb: 1,
      }}
      onClick={() => movePage("/market")}
    >
      <Typography
        sx={{
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
        }}
        color="error"
      >
        B
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
          color: "white",
        }}
      >
        oard&nbsp;
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
        }}
        color="#ffd900"
      >
        G
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
          color: "white",
        }}
      >
        ame&nbsp;
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
        }}
        color="primary"
      >
        M
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
          color: "white",
        }}
      >
        arket
      </Typography>
    </Box>
  );
}
