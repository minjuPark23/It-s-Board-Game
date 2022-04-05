import { Typography, Box } from "@mui/material";

interface Title {
  title: string;
}

/*
 <StyledToolBar sx={{ mt: { xs: 7, sm: 8, md: 8 } }}>
        <Box
          height="65px"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Box
            sx={{ width: { md: "60%" } }}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Title title="내 주변 보드게임 카페 찾기" />
          </Box>
        </Box>
      </StyledToolBar>
*/
export default function TitleBackground({ title }: Title) {
  return (
    <Box
      sx={{
        width: 1,
        height: { md: "70px", xs: "100px" },
        position: "absolute",
        display: "block",
      }}
      bgcolor="#FCB500"
    >
      <Typography
        sx={{
          mt: { md: 1, xs: 7 },
          ml: { md: 44, xs: 4 },
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
          mb: 1,
        }}
        color={"white"}
      >
        {title}
      </Typography>
    </Box>
  );
}
