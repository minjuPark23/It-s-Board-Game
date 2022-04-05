import { useEffect, useState } from "react";
import BoardCardMain from "../../../component/BoardCardMain";
import { Box, Container, Grid, Typography } from "@mui/material";
import { getLikedList } from "../../../api/user";
import { RootStateOrAny, useSelector } from "react-redux";
import TitleBackground from "../../../component/TitleBackground";
// Game 객체 => types파일로 빼는 것이 좋음
export interface Game {
  gameNo: number;
  gameImg: string;
  gameName: string;
  gameMinPlayer: number;
  gameMaxPlayer: number;
  gameCategory: string;
  gameTotalScore: number;
  like: boolean;
  gameKorName: string;
}

// 테마별 게임리스트: sm(600) 이상(pc)에서는 버튼으로, 이하(모바일)에서는 스크롤로 동작
export default function MyGames() {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [userno] = useState(
    useSelector((state: RootStateOrAny) => state.user.userNo)
  );
  // const pic = "img/logo_tears.png";

  // 관심 게임이 없는 경우 추가해야함
  useEffect(() => {
    // API 연결(게임리스트 불러오기)
    const init = async () => {
      let data = await getLikedList(userno);
      if (data != null) setGameList(data); //gameImg, gameName, gameNo를 준다
    };
    init();
  });

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ mt: { xs: 1, sm: 1, md: 6 } }}
      >
        <TitleBackground title="내 관심 목록" />
      </Grid>

      <Container style={{ marginTop: 20, padding: 10 }}>
        <Grid container spacing={2}>
          {gameList.length != 0 ? (
            gameList.map((game) => (
              <BoardCardMain key={game.gameNo} game={game}></BoardCardMain>
            ))
          ) : (
            <Typography>아직 관심 등록된 게임이 없어요</Typography>
          )}
        </Grid>
        <Box sx={{ mb: 15 }} />
      </Container>
    </>
  );
}
