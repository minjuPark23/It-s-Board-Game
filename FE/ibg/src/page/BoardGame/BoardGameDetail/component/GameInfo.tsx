import StarRating from "../../../../component/StarRating";
import LikeButton from "../../../../component/LikeButton";
import { GameDetail } from "../index";

import { styled } from "@mui/material/styles";
import { Divider, ImageListItem, SvgIcon, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CategoryIcon from "@mui/icons-material/Category";

const GameWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: theme.spacing(4, 0),
}));

const ImgWrapper = styled(ImageListItem)(({ theme }) => ({
  width: "100%",
  objectFit: "contain",
  [theme.breakpoints.up("sm")]: {
    width: "35%",
  },
}));

const InfoWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2, 1),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2, 3),
    width: "65%",
  },
}));

const InfoText = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // flexWrap: "wrap",
  fontSize: 14,
  [theme.breakpoints.up("sm")]: {
    fontSize: 17,
  },
}));

const InfoIcon = styled(SvgIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.grey[600],
  fontSize: 19,
  [theme.breakpoints.up("sm")]: {
    fontSize: 21,
  },
}));

const AvgRate = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontSize: 22,
  padding: theme.spacing(3),
  fontWeight: 600,
  borderRadius: "50%",
  boxShadow: "rgba(252, 181, 0, 0.24) 0px 3px 8px",
  [theme.breakpoints.up("sm")]: {
    fontSize: 30,
  },
}));

const ScoreAndLike = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const AlignDiv = styled("div")(() => ({
  textAlign: "center",
}));

export default function GameInfo(props: { game: GameDetail }) {
  return (
    <GameWrapper>
      <ImgWrapper>
        <img src={props.game.gameImg} alt={props.game.gameName} />
      </ImgWrapper>
      <InfoWrapper>
        <Typography sx={{ fontSize: { xs: 18, md: 25 }, fontWeight: "bold" }}>
          {props.game.gameNameKr}
          <Typography component="span">({props.game.gameYear})</Typography>
        </Typography>
        <Typography
          sx={{ fontSize: { xs: 13, md: 16 }, color: "gray", mb: 1.5 }}
        >
          {props.game.gameName}
        </Typography>
        <InfoText>
          <InfoIcon>
            <PersonIcon />
          </InfoIcon>
          게임인원: {props.game.gameMinPlayer}~{props.game.gameMaxPlayer}명
        </InfoText>
        <InfoText>
          <InfoIcon>
            <AccessTimeIcon />
          </InfoIcon>
          플레이시간: {props.game.gameMinTime}~{props.game.gameMaxTime}분
        </InfoText>
        <InfoText>
          <InfoIcon>
            <EqualizerIcon />
          </InfoIcon>
          난이도: {props.game.gameWeight} / 5
        </InfoText>
        <InfoText>
          <InfoIcon>
            <CategoryIcon />
          </InfoIcon>
          카테고리: {props.game.gameCategory}
        </InfoText>
        <InfoText sx={{ mt: 1.5 }}>{props.game.gameDesc}</InfoText>
        <AvgRate>
          {props.game.gameTotalScore}
          {/* <Typography component="span"> 점</Typography> */}
        </AvgRate>
        <ScoreAndLike>
          <AlignDiv>
            <Typography sx={{ fontSize: { xs: 13, md: 16 } }}>
              내 점수는요
            </Typography>
            <StarRating initStarRate={5} size={35} />
          </AlignDiv>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: { xs: 1.5, md: 3 } }}
          />
          <AlignDiv>
            <Typography sx={{ fontSize: { xs: 13, md: 16 } }}>
              관심있어요
            </Typography>
            <LikeButton initLike={props.game.isLike} size={30} />
          </AlignDiv>
        </ScoreAndLike>
      </InfoWrapper>
    </GameWrapper>
  );
}
