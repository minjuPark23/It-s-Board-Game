import React from "react";
import { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Divider,
  InputBase,
  Button,
} from "@mui/material";
import { styled, alpha, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import BoardCard from "./component/BoardCard";
import MarketUploadDialog from "./component/MarketUploadDialog";
import Title from "./component/Title";
export default function BoardGameMarket() {
  const [dealList] = useState(tempData.dealList);
  const [open, setOpen] = useState(false); //modal

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
    fontSize: "1.5rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };
  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  //navigate when "Yes" is pressed on dialog OR pressed Complete
  const handleSubmit = async (
    title: string,
    price: number,
    contents: string,
    file: File | undefined
  ) => {
    setOpen(false);
    //api 연결하기 : 등록
    // alert(title + " " + price);
    //navigate("/complete");
  };

  const viewDetail = (dealNo: number) => {
    console.log(dealNo);
  };
  return (
    <Container style={{ marginTop: 20, padding: 20 }}>
      {/* BGM 상단 */}
      <Box
        style={{ marginBottom: 10 }}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* 거래 업로드 버튼 */}
        <Title />
        <Button
          style={{ height: 20 }}
          sx={{ top: { md: 28, xs: 10 } }}
          color="primary"
          onClick={handleOpen}
        >
          거래 등록
        </Button>
        <MarketUploadDialog
          open={open}
          handleClose={handleClose}
          sendDataToParent={handleSubmit}
        />
      </Box>
      <Divider />
      <Search sx={{ width: { xs: "100%", sm: 330 } }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="마켓 검색"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Grid container spacing={1} style={{ marginTop: 14 }}>
        {dealList.map((deal) => (
          <BoardCard
            key={deal.dealNo}
            deal={deal}
            
          ></BoardCard>
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
      dealNo: 1,
      dealImage:
        "https://ae01.alicdn.com/kf/H886df0f1371840bc8607e8eccd08a84bd/Mattel-Games-UNO-Kartenspiel-UNO.jpg_Q90.jpg_.webp",
      dealPrice: 5000,
    },
  ],
};
