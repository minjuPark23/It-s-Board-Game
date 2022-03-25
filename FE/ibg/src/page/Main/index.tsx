import { Container, Grid } from "@mui/material";
import { useState } from "react";
import BoardCard from "./component/BoardCard";

export default function Main() {
  const [gameList, setGameList] = useState(tempData.gameList);

  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
      <Grid container spacing={2}>
        {gameList.map((game) => (
          <BoardCard key={game.gameNo} game={game}></BoardCard>
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
      gameMinPlayer: 3,
      gameMaxPlayer: 5,
      // gameMinTime: 240,
      // gameMaxTime: 240,
      // gameYear: 1986,
      // gameWeight: 4.3,
      // gameAge: 14,
      gameCategory: "Economic|Negotiation|Political",
      // gameDesc: "Die Macher is a game about seven sequential political races in different regions of Germany. Players...",
      gameTotalScore: 7.6,
      isLike: true,
    },
    {
      gameNo: 2,
      gameImg:
        "https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg",
      gameName: "Dragonmaster",
      gameMinPlayer: 3,
      gameMaxPlayer: 4,
      // gameMinTime: 30,
      // gameMaxTime: 30,
      // gameYear: 1981,
      // gameWeight: 1.9,
      // gameAge: 12,
      gameCategory: "Card Game|Fantasy",
      // gameDesc: "Dragonmaster is a trick-taking card game based on an older game called Coup d'État. Each player is g...",
      gameTotalScore: 6.6,
      isLike: false,
    },
    {
      gameNo: 3,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
      gameMinPlayer: 2,
      gameMaxPlayer: 4,
      // gameMinTime: 30,
      // gameMaxTime: 60,
      // gameYear: 1998,
      // gameWeight: 2.4,
      // gameAge: 10,
      gameCategory: "Abstract Strategy|Medieval",
      // gameDesc: "Samurai is set in medieval Japan. Players compete to gain the favor of three factions: samurai, peas...",
      gameTotalScore: 7.4,
      isLike: false,
    },
  ],
};
