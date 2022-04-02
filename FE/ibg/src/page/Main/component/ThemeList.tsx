import { useState, useRef } from "react";
import BoardCardMain from "../../../component/BoardCardMain";

import { Box, styled, Typography } from "@mui/material";

// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Game } from "..";

const CardsBox = styled(Box)(() => ({
  position: "relative",
  overflowX: "auto",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none", // 스크롤바 숨김
  },
}));

const ArrowBox = styled(Box)(({ theme }) => ({
  width: 35,
  height: 35,
  textAlign: "center",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[600],
  cursor: "pointer",
}));

export default function ThemeList(props: { title: string; gameList: Game[] }) {
  const [currentX, setCurrentX] = useState(0);
  const carouselWidth = useRef<HTMLDivElement>(null);

  // PC에서 버튼으로 슬라이드 하는 부분, 시간 되면 조정 필요함...
  const handleCarousel = (dir: number) => {
    if (
      (dir > 0 && currentX < 0) ||
      (dir < 0 &&
        currentX >
          (props.gameList.length + 0.3) * dir +
            (carouselWidth.current ? carouselWidth.current.offsetWidth : 0))
    ) {
      setCurrentX((currentX) => currentX + dir);
    }
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 24 },
          fontWeight: "bold",
          mt: 4,
          mb: 1,
        }}
      >
        {props.title}
        {/* <HelpOutlineIcon sx={{ verticalAlign: "-0.2rem", ml: 1 }} /> */}
      </Typography>
      <CardsBox>
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s",
            transform: `translateX(${currentX}px)`,
          }}
          ref={carouselWidth}
        >
          {props.gameList.map((game) => (
            <BoardCardMain key={game.gameNo} game={game}></BoardCardMain>
          ))}
        </Box>
        <ArrowBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            display: { xs: "none", sm: "block" },
          }}
          onClick={() => handleCarousel(182)}
        >
          <NavigateBeforeIcon
            sx={{ verticalAlign: "-0.7rem", color: "white" }}
          />
        </ArrowBox>
        <ArrowBox
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            display: { xs: "none", sm: "block" },
          }}
          onClick={() => handleCarousel(-182)}
        >
          <NavigateNextIcon sx={{ verticalAlign: "-0.7rem", color: "white" }} />
        </ArrowBox>
      </CardsBox>
    </>
  );
}
