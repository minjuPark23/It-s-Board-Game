import React, { useEffect } from "react";
import { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import User from "./component/User";
import Title from "../component/Title";
import AvatarGenerator from "../../../../component/AvatarGenerator";
export default function DealDetail() {
  const [dealList] = useState(tempData.dealList);
  const [dealer, setDealer] = useState("");
  useEffect(() => {
    setDealer("김싸피");
  }, []);
  return (
    <>
      <Container style={{ marginTop: 20, padding: 20 }}>
        {/* 제목 */}
        <Box
          style={{ marginBottom: 10 }}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Title />
        </Box>
        <Divider />
        {/* 내용 */}
        <Grid
          container
          spacing={1}
          style={{ marginTop: 14 }}
          direction="column"
        >
          <Grid item>
            {/* 상단 */}
            <Box
              style={{ marginBottom: 10 }}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="subtitle1">
                <AvatarGenerator userName={dealer} />
              </Typography>

              <Button
                style={{ height: 20 }}
                sx={{ top: { md: 28, xs: 10 } }}
                color="primary"
                variant="outlined"
              >
                거래하기
              </Button>
            </Box>
          </Grid>
          {/* 사진 */}
          <Grid item direction="row">
            이미지
          </Grid>
          <Grid item direction="row">
            제목
          </Grid>
          <Grid item direction="row">
            <div>거래중 = 판매자일 경우 바꿀 수 있도록!</div>
          </Grid>
          <Grid item direction="row">
            가격
          </Grid>
          <Grid item direction="row">
            원{" "}
          </Grid>
        </Grid>
      </Container>
    </>
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
