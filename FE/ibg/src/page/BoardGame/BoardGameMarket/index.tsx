import React from 'react';
import { useState } from "react";
import { Grid, Box, Container, ThemeProvider, Typography, Divider, InputBase } from "@mui/material";
import { styled, alpha, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import BoardCard from "./component/BoardCard";
import MarketUpload from "./component/MarketUpload";

export default function BoardGameMarket() {

const [dealList] = useState(tempData.dealList);

/* 검색 */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 18,
  backgroundColor: alpha(theme.palette.warning.main, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.warning.main, 0.25),
  },
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "grey",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: 13.5,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "120ch",
    },
  },
}));

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});

theme.typography.h3 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};


  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
    {/* BGM 상단 */}
    <Box style={{ marginBottom: 10 }} sx={{ display: "flex", justifyContent: 'space-between'}}>
    <ThemeProvider theme={theme}>
      <Typography variant="h3" sx={{ display: "flex"}}>
        <Typography variant="h3" color="error">B</Typography>
        oard&nbsp;
        <Typography variant="h3" color="#FCB500">G</Typography>
        ame&nbsp;
        <Typography variant="h3" color="primary">M</Typography>
        arket</Typography>
    </ThemeProvider>
       {/* 거래 업로드 버튼 */}
       <MarketUpload/>
    </Box>
    <Divider />
        <Search style={{ width: 330, marginTop: 20 }}>
          <SearchIconWrapper>
          <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="마켓 검색"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      <Grid container spacing={1} style={{ marginTop: 14 }} >
        {dealList.map((deal) => (
          <BoardCard key={deal.gameNo} deal={deal}></BoardCard>
        ))}
      </Grid>
     
    </Container>
  );
}

// 임시 데이터
const tempData = {
  dealList: [
    {
      dealTitle: "보드게임 팝니다.",
      dealState: false,
      gameNo: 1,
      gameImg:
        "https://ae01.alicdn.com/kf/H886df0f1371840bc8607e8eccd08a84bd/Mattel-Games-UNO-Kartenspiel-UNO.jpg_Q90.jpg_.webp",
      gameName: "UNO",
      gamePrice: 5000
    },
    {
      dealTitle: "얍얍",
      dealState: false,
      gameNo: 2,
      gameImg:
        "http://openimage.interpark.com/goods_image_big/3/1/9/1/8358463191_l.jpg",
      gameName: "CATAN",
      gamePrice: 15000
    },
    {
      dealTitle: "[젠가]저렴하다.",
      dealState: true,
      gameNo: 3,
      gameImg:
        "https://target.scene7.com/is/image/Target/GUEST_2ff3e3eb-c38d-4c5a-a6bc-7b95b96c3fec?wid=488&hei=488&fmt=pjpeg",
      gameName: "Jenga",
      gamePrice: 3000
    },
    {
      dealTitle: "부루마블 판매",
      dealState: false,
      gameNo: 4,
      gameImg:
        "http://openimage.interpark.com/goods_image/1/7/9/3/8297011793s.jpg",
      gameName: "부루마블",
      gamePrice: 20000
    },
    {
      dealTitle: "루미큐브 판매한다",
      dealState: false,
      gameNo: 5,
      gameImg:
        "http://rummikubshop.co.kr/web/product/big/202010/e1b94b790fb40aa849a74028e44f803f.jpg",
      gameName: "Rummikub",
      gamePrice: 4500
    },
    {
      dealTitle: "[할리갈리]잼씀",
      dealState: true,
      gameNo: 6,
      gameImg:
        "https://www.koreaboardgames.com/upload/uploaded/prd/415051482112635.png",
      gameName: "Halli Galli",
      gamePrice: 25000
    },
  ],
};
