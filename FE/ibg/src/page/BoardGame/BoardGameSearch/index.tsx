import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { searchAuto } from "../../../api/game";
import BoardCardMain from "../../../component/BoardCardMain";
import { Game } from "../../Main/index";
import { Box, Container, Grid, Typography } from "@mui/material";
import CustomSelect, { StyledOption } from "./component/CustomSelect";

export default function BoardGameSearch() {
  const [initGameList, setInitGameList] = useState<Game[]>([]);
  const [gameList, setGameList] = useState<Game[]>([]);
  const [sortingOpt, setSortingOpt] = useState<string | null>("recomm");
  const userNo = useSelector((state: RootStateOrAny) => state.user.userNo);

  useEffect(() => {
    searchAuto("", userNo).then((data) => {
      setInitGameList(data);
      setGameList(data);
    });
  }, []);

  useEffect(() => {
    let sortData = [...initGameList];

    switch (sortingOpt) {
      case "recomm":
        setGameList(initGameList);
        break;
      case "starRate":
        sortData.sort((a, b) => b.gameTotalScore - a.gameTotalScore);
        setGameList(sortData);
        break;
      case "name":
        sortData.sort((a, b) => a.gameKorName.localeCompare(b.gameKorName));
        setGameList(sortData);
        break;
    }
  }, [sortingOpt]);

  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 20, md: 30 },
            fontWeight: "bold",
            mb: 1,
          }}
        >
          보드게임
        </Typography>
        <CustomSelect value={sortingOpt} onChange={setSortingOpt}>
          <StyledOption value="recomm">추천순</StyledOption>
          <StyledOption value="starRate">평점순</StyledOption>
          <StyledOption value="name">이름순</StyledOption>
        </CustomSelect>
      </Box>
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
