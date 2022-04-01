import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { searchAuto, searchFilter } from "../../../api/game";
import BoardCardMain from "../../../component/BoardCardMain";
import { Game } from "../../Main/index";
import CustomSelect, { StyledOption } from "./component/CustomSelect";
import GameFilter, { ISearchFilter } from "./component/GameFilter";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function BoardGameSearch() {
  const [initGameList, setInitGameList] = useState<Game[]>([]);
  const [gameList, setGameList] = useState<Game[]>([]);
  const [sortingOpt, setSortingOpt] = useState<string | null>("recomm");
  const userNo = useSelector((state: RootStateOrAny) => state.user.userNo);

  // 페이지 접속 시 1회 실행
  useEffect(() => {
    searchAuto("", userNo).then((data) => {
      setInitGameList(data);
      setGameList(data);
    });
  }, [userNo]);

  // sortingOpt이 변경되면 실행
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
  }, [sortingOpt, initGameList]);

  const getSearchResult = (filter: ISearchFilter) => {
    if (userNo) filter.userNo = userNo;

    searchFilter(filter).then((data) => {
      if (data.code === 200) {
        setInitGameList(data.data);
        setGameList(data.data);
      } else if (data.code === 204) {
        setInitGameList([]);
        setGameList([]);
      }
    });
  };

  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
      {/* 필터링 박스 */}
      <GameFilter searchCallback={getSearchResult} />
      {/* 제목, 정렬 선택 박스 */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 5, mb: 1 }}
      >
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
      {/* 보드게임 카드 */}
      {gameList.length > 0 ? (
        <Grid container spacing={2}>
          {gameList.map((game) => (
            <BoardCardMain
              key={game.gameNo}
              game={game}
              responsive
            ></BoardCardMain>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center">
          <Typography
            sx={{ fontSize: { xs: 15, sm: 23 }, fontWeight: 600, my: 20 }}
          >
            앗❕ 조건에 맞는 보드게임이 없어요😧
          </Typography>
        </Box>
      )}
    </Container>
  );
}
