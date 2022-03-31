import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import BoardCardMain from "../../../component/BoardCardMain";
import { Game } from "../../Main/index";

export default function Main() {
  const [gameList, setGameList] = useState<Game[]>([]);

  useEffect(() => {
    // API 연결(게임리스트 불러오기)
    setGameList(tempData.gameList);
  }, []);

  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
      <Grid container spacing={2}>
        {gameList.map((game) => (
          <BoardCardMain
            key={game.gameNo}
            game={game}
            responsive
          ></BoardCardMain>
        ))}
      </Grid>
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
