import { useState, useEffect } from "react";
import {
  getDealDetail,
  closeDeal,
  addDealReview,
  getDealReviewList,
} from "../../../../api/deal";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Container,
  Divider,
  Button,
  Typography,
  ImageListItem,
} from "@mui/material";
import AvatarGenerator from "../../../../component/AvatarGenerator";
import ReviewInfo from "../../component/ReviewInfo";
import { RootStateOrAny, useSelector } from "react-redux";
import BGMTitle from "../../component/BGMTitle";

export default function DealDetail() {
  const dealNo = Number(useParams().dealNo);
  const userNo = useSelector((state: RootStateOrAny) => state.user.userNo);
  const [dealDetail, setDealDetail] = useState<any>();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getDealDetail(dealNo).then((data) => {
      console.log(data);
      setDealDetail(data.data);
    });
    getReviewList();
  }, [dealNo]);

  const handleChangeStatus = () => {
    closeDeal(dealNo).then((data) => {
      console.log(data);
      if (data.code === 200) {
        setDealDetail({ ...dealDetail, dealStatus: true });
      }
    });
  };

  const registerReview = (content: string) => {
    addDealReview(dealNo, userNo, content).then((data) => {
      if (data.code === 200) getReviewList();
    });
  };

  const getReviewList = () => {
    getDealReviewList(dealNo).then((data) => {
      setReviewList(data.data);
    });
  };

  /* 제목 style */
  const DealTitle = styled("div")(() => ({
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  }));

  /* 거래상태 style */
  const DealStatus = styled("span")(() => ({
    textAlign: "center",
  }));

  /* 가격 style */
  const DealPrice = styled("div")(() => ({
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  }));

  /* 설명 style */
  const DealContent = styled("div")(() => ({
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  }));

  /* 이미지 style */
  const ImgWrpper = styled("div")(() => ({
    textAlign: "center",
    marginTop: -10,
    img: {
      width: "100%",
      maxHeight: "550px",
      objectFit: "contain",
    },
  }));

  /* 거래 상태 */
  const MarketState = styled("span")(({ theme, color }) => ({
    lineHeight: 2,
    fontSize: 14,
    color: color,
    borderRadius: 8,
    border: "1px solid " + color,
    backgroundColor: "transparent",
    padding: theme.spacing(0.5, 1.4, 0.6, 1.4),
  }));

  return (
    <>
      <BGMTitle />
      <Container maxWidth="md" style={{ marginTop: 1, padding: 20 }}>
        {/* BGM */}
        <Box
          style={{ marginBottom: 5 }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        ></Box>

        {/* 내용 */}
        <Grid container spacing={1} direction="column">
          <Grid item>
            {/* 상단 */}
            <Box
              style={{ marginBottom: 10 }}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box style={{ marginBottom: 10 }} sx={{ display: "flex" }}>
                <Typography variant="subtitle1">
                  <AvatarGenerator
                    userName={dealDetail ? String(dealDetail.userNo) : ""}
                    isNav={false}
                  />
                </Typography>
                <Typography style={{ marginLeft: 8, marginTop: 8 }}>
                  {dealDetail ? String(dealDetail.userNick) : ""}
                </Typography>
              </Box>
              <Button
                style={{ height: 30 }}
                sx={{ top: { md: 7, xs: 6 } }}
                color="primary"
                variant="outlined"
              >
                거래하기
              </Button>
            </Box>
          </Grid>
          {/* 사진 */}
          <Grid item direction="row">
            <ImgWrpper>
              <img
                src={dealDetail?.dealPath + "/" + dealDetail?.dealSavedName}
              />
            </ImgWrpper>
          </Grid>
          <Grid item direction="row">
            <DealTitle>{dealDetail?.dealTitle}</DealTitle>
          </Grid>
          <Grid item direction="row">
            <MarketState
              sx={{ cursor: "pointer" }}
              color={dealDetail?.dealStatus ? "#67B6FF" : "#FCB500"}
            >
              {dealDetail?.dealStatus ? (
                "거래완료"
              ) : dealDetail?.userNo === userNo ? (
                <DealStatus onClick={handleChangeStatus}>거래중</DealStatus>
              ) : (
                "거래중"
              )}
            </MarketState>
          </Grid>
          <Grid item direction="row">
            <DealPrice>{dealDetail?.dealPrice.toLocaleString()}원</DealPrice>
          </Grid>
          <Grid item direction="row">
            <DealContent>{dealDetail?.dealContent}</DealContent>
          </Grid>
          <Grid item direction="row">
            <Typography
              sx={{
                fontSize: { xs: 12, md: 16 },
                top: 10,
                right: 5,
                color: "gray",
              }}
            >
              {(() => {
                const date = new Date(dealDetail?.dealReg);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1);
                const day = String(date.getDate());
                return `${year}. ${month.padStart(2, "0")}. ${day.padStart(
                  2,
                  "0"
                )}`;
              })()}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 2 }} />
        <ReviewInfo
          title="댓글"
          reviewList={reviewList}
          userNo={userNo}
          addCallback={registerReview}
        />
      </Container>
    </>
  );
}
