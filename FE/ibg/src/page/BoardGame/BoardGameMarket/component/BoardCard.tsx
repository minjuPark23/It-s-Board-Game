import * as React from "react";
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* 하단 틀 */
const StateWrapper = styled(CardActions)(({ theme }) => ({
    justifyContent: 'space-between',
  padding: theme.spacing(0),
  marginRight: 0,
  marginTop: 20,
}));

/* 거래 상태 */
const MarketState = styled("span")(({ theme }) => ({
    width: 80,
    height: 30,
    lineHeight: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#FCB500',
    borderRadius: 10,
    border: "1px solid #FCB500",
    backgroundColor: "transparent",
    padding: theme.spacing(1),
  }));

/* 거래 가격 */
  const Price = styled(Typography)(({ theme }) => ({
    width: 80,
    height: 30,
    textAlign: 'right',
    padding: theme.spacing(0.8, 0, 0, 0),
}));

export default function BoardCard() {
  return (
      <Card style={{ margin: 11 }} sx={{ width: { xs: 320, md: 270 } }}>
        {/* 데이터 받아와서 뿌리기(거래 상태에 따라 색 변경 필요) */}
        <CardActionArea>
            <CardMedia
            component="img"
            height="200"
            image="https://ae01.alicdn.com/kf/H886df0f1371840bc8607e8eccd08a84bd/Mattel-Games-UNO-Kartenspiel-UNO.jpg_Q90.jpg_.webp"
            alt="boardgame"
            />
            <CardContent>
            <Typography gutterBottom component="div">
                보드게임 팔아요
            </Typography>
            <Typography variant="body2">
                UNO
            </Typography>
            <StateWrapper>
                <MarketState>
                    거래중
                </MarketState>
                <Price variant="body2">
                    5,000원
                </Price>
            </StateWrapper>
            </CardContent>
        </CardActionArea>
      </Card>
  );
}
