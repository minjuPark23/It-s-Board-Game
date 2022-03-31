import { useEffect, useState, useRef } from "react";
import BoardCardMain from "../../component/BoardCardMain";
import { Box, Container, styled, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Game 객체 => types파일로 빼는 것이 좋음
export interface Game {
  gameNo: number;
  gameImg: string;
  gameName: string;
  gameKorName: string;
  gameMinPlayer: number;
  gameMaxPlayer: number;
  gameCategory: string;
  gameTotalScore: number;
  like: boolean;
}

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

// 테마별 게임리스트: sm(600) 이상(pc)에서는 버튼으로, 이하(모바일)에서는 스크롤로 동작
export default function Main() {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [currentX, setCurrentX] = useState(0);
  const carouselWidth = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // API 연결(게임리스트 불러오기)
    setGameList(tempData.gameList);
  }, []);

  // PC에서 버튼으로 슬라이드 하는 부분, 시간 되면 조정 필요함...
  const handleCarousel = (dir: number) => {
    if (
      (dir > 0 && currentX < 0) ||
      (dir < 0 &&
        currentX >
          (gameList.length + 0.3) * dir +
            (carouselWidth.current ? carouselWidth.current.offsetWidth : 0))
    ) {
      setCurrentX((currentX) => currentX + dir);
    }
  };

  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 24 },
          fontWeight: "bold",
          mb: 1,
        }}
      >
        나의 맞춤 추천
        <HelpOutlineIcon sx={{ verticalAlign: "-0.2rem", ml: 1 }} />
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
          {gameList.map((game) => (
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
    </Container>
  );
}

// 임시 데이터
const tempData = {
  gameList: [
    {
      gameNo: 1,
      gameImg:
        "https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg",
      gameName: "Die Macher long title very long",
      gameKorName: "디 마허 정말 길고 긴 보드게임 이름",
      gameMinPlayer: 3,
      gameMaxPlayer: 5,
      gameCategory: "Economic|Negotiation|Political",
      gameTotalScore: 7.6,
      like: true,
    },
    {
      gameNo: 2,
      gameImg:
        "https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg",
      gameName: "Dragonmaster",
      gameKorName: "드래곤마스터",
      gameMinPlayer: 3,
      gameMaxPlayer: 4,
      gameCategory: "Card Game|Fantasy",
      gameTotalScore: 6.6,
      like: false,
    },
    {
      gameNo: 3,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
      gameKorName: "사무라이",
      gameMinPlayer: 2,
      gameMaxPlayer: 4,
      gameCategory: "Abstract Strategy|Medieval",
      gameTotalScore: 7.4,
      like: false,
    },
    {
      gameNo: 4,
      gameImg:
        "https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg",
      gameName: "Die Macher long title very long",
      gameKorName: "디 마허 정말 길고 긴 보드게임 이름",
      gameMinPlayer: 3,
      gameMaxPlayer: 5,
      gameCategory: "Economic|Negotiation|Political",
      gameTotalScore: 7.6,
      like: true,
    },
    {
      gameNo: 5,
      gameImg:
        "https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg",
      gameName: "Dragonmaster",
      gameKorName: "드래곤마스터",
      gameMinPlayer: 3,
      gameMaxPlayer: 4,
      gameCategory: "Card Game|Fantasy",
      gameTotalScore: 6.6,
      like: false,
    },
    {
      gameNo: 6,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
      gameKorName: "사무라이",
      gameMinPlayer: 2,
      gameMaxPlayer: 4,
      gameCategory: "Abstract Strategy|Medieval",
      gameTotalScore: 7.4,
      like: false,
    },
    {
      gameNo: 7,
      gameImg:
        "https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg",
      gameName: "Die Macher long title very long",
      gameKorName: "디 마허 정말 길고 긴 보드게임 이름",
      gameMinPlayer: 3,
      gameMaxPlayer: 5,
      gameCategory: "Economic|Negotiation|Political",
      gameTotalScore: 7.6,
      like: true,
    },
    {
      gameNo: 8,
      gameImg:
        "https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg",
      gameName: "Dragonmaster",
      gameKorName: "드래곤마스터",
      gameMinPlayer: 3,
      gameMaxPlayer: 4,
      gameCategory: "Card Game|Fantasy",
      gameTotalScore: 6.6,
      like: false,
    },
    {
      gameNo: 9,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
      gameKorName: "사무라이",
      gameMinPlayer: 2,
      gameMaxPlayer: 4,
      gameCategory: "Abstract Strategy|Medieval",
      gameTotalScore: 7.4,
      like: false,
    },
  ],
};
