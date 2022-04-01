import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
interface Deal {
  deal: {
    dealTitle: string;
    dealState: boolean;
    dealNo: number;
    dealImage: string; // File | null;
    dealPrice: number;
  };
}

const StyledCard = styled(Card)(() => ({
  "&:hover": {
    animation: "circlemove 1.5s infinite linear",
  },
  "@keyframes circlemove": {
    "0%,100%": { transform: "translate(-1%,-1%)" },
    "50%": {
      transform: "translate(-1%,-2%)",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
  },
}));

const ImgWrapper = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: 0,
  overflow: "hidden",
  paddingBottom: "100%",
}));

const DealTitle = styled("div")(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  marginBottom: theme.spacing(1),
}));

const Category = styled("div")(({ theme }) => ({
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  marginBottom: theme.spacing(1.3),
}));

/* 거래 상태 */
const MarketState = styled("span")(({ theme }) => ({
  width: 80,
  height: 30,
  lineHeight: 1,
  textAlign: "center",
  fontSize: 12,
  color: "#FCB500",
  borderRadius: 10,
  border: "1px solid #FCB500",
  backgroundColor: "transparent",
  padding: theme.spacing(1),
}));

/* 거래 가격 */
const Price = styled(Typography)(({ theme }) => ({
  width: 80,
  height: 30,
  textAlign: "right",
  padding: theme.spacing(0.8, 0, 0, 0),
}));

/* 하단 틀 */
const StateWrapper = styled(CardActions)(({ theme }) => ({
  justifyContent: "space-between",
  padding: theme.spacing(0),
  marginRight: 0,
  marginTop: 20,
}));

export default function BoardCard({ deal }: Deal) {
  const navigate = useNavigate();
  const moveToDetail = () => {
    navigate(`/market/detail/${deal.dealNo}`);
  };
  return (
    <Grid item xs={6} sm={4} md={3} lg={2.4}>
      <StyledCard variant="outlined" onClick={moveToDetail}>
        <CardActionArea>
          <ImgWrapper>
            <CardMedia
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              component="img"
              image={deal.dealImage}
              alt={deal.dealTitle}
            />
          </ImgWrapper>
          <CardContent>
            <DealTitle>{deal.dealTitle}</DealTitle>

            <StateWrapper>
              <MarketState>{deal.dealState}거래중</MarketState>
              <Price variant="body2">{deal.dealPrice}원</Price>
            </StateWrapper>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Grid>
  );
}
