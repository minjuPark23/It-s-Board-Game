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
    <Box sx={{ display: "flex" }} onClick={() => movePage("/market")}>
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
