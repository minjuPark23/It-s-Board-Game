import React, { useEffect, useState } from "react";
import BoardCardMain from "./component/BoardCardSurvey";
import { Button, Box, Grid, Container } from "@mui/material";
import WelcomeStepper from "../component/WelcomeStepper";
import { useNavigate } from "react-router-dom";
import { initSurvey } from "../../../api/user";
// Game 객체 => types파일로 빼는 것이 좋음
export interface Game {
  gameNo: number;
  gameImg: string;
  gameName: string;
}

export default function Survey() {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [width] = useState(window.innerWidth);
  useEffect(() => {
    // API 연결(게임리스트 불러오기)
    setGameList(tempData.gameList);
    // const init = async () => {
    //   const data = await initSurvey();
    //   setGameList(data);
    //   console.log(data);
    // };
    // init();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ mt: { xs: 1, sm: 5, md: 8 } }}
      >
        <Box sx={{ width: width < 600 ? "90%" : "33%" }}>
          <WelcomeStepper value="1" />
        </Box>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100%" }}
      >
        <Container style={{ marginTop: 20, padding: 10 }}>
          <Grid container spacing={2}>
            {gameList.map((game) => (
              <BoardCardMain key={game.gameNo} game={game}></BoardCardMain>
            ))}
          </Grid>
        </Container>
        <Button
          style={{ position: "fixed", bottom: "0px" }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"

          //onClick={sendData}
          // className={classes.submit}
        >
          완료
        </Button>
      </Grid>
    </>
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
    },
    {
      gameNo: 12,
      gameImg:
        "https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg",
      gameName: "Dragonmaster",
    },
    {
      gameNo: 11,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
    {
      gameNo: 10,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
    {
      gameNo: 9,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
    {
      gameNo: 8,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
    {
      gameNo: 7,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
    {
      gameNo: 6,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
    {
      gameNo: 5,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
    {
      gameNo: 4,
      gameImg:
        "https://cf.geekdo-images.com/original/img/mPS50ts53753q5-kb5vWbTDN8Z0=/0x0/pic3211873.jpg",
      gameName: "Samurai",
    },
  ],
};
