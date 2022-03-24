import React from 'react';
import { Grid, Box, Container, ThemeProvider, Typography, Divider, InputBase } from "@mui/material";
import { styled, alpha, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import BoardCard from "./component/BoardCard";
import MarketUpload from "./component/MarketUpload";

export default function BoardGameMarket() {
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
        {/* 여기서 데이터를 보내야 할듯 */}
        <BoardCard/>
        <BoardCard/>
        <BoardCard/>
        <BoardCard/>
        <BoardCard/>
        <BoardCard/>
        <BoardCard/>
      </Grid>
     
    </Container>
  );
}

