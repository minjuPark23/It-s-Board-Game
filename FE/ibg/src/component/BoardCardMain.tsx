import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { Game } from "../page/Main";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

// 카드 효과 스타일
const StyledCard = styled(Card)(() => ({
  position: "relative",
  minWidth: "178px",
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

// 이미지 영역
const ImgWrapper = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: 0,
  overflow: "hidden",
  paddingBottom: "100%",
}));

// 게임명 스타일
const GameTitle = styled("div")(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  marginBottom: theme.spacing(1),
}));

// 카테고리 스타일
const Category = styled("div")(({ theme }) => ({
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  marginBottom: theme.spacing(1.3),
}));

// 부가정보 스타일
const AddInfo = styled("div")(() => ({
  fontSize: "0.8rem",
  display: "flex",
  alignItems: "center",
}));

// 관심 버튼 위치
const LikeButtonPosition = styled("span")(() => ({
  position: "absolute",
  right: "16px",
  bottom: "10px",
}));

export default function BoardCard(props: { game: Game; responsive?: boolean }) {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const navigate = useNavigate();
  const moveToDetail = () => {
    navigate(`/detail/${props.game.gameNo}`);
  };

  const insideInfo = () => {
    return (
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
              image={props.game.gameImg}
              alt={props.game.gameName}
            />
          </ImgWrapper>
          <CardContent>
            <GameTitle>{props.game.gameName}</GameTitle>
            <Category>{props.game.gameCategory}</Category>
            <AddInfo>
              <PersonIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />
              {props.game.gameMinPlayer}~{props.game.gameMaxPlayer}명
              <StarIcon color="warning" fontSize="small" sx={{ mx: 0.5 }} />
              {props.game.gameTotalScore}
            </AddInfo>
            <LikeButtonPosition>
              <LikeButton
                initLike={props.game.like}
                size={28}
                gameNo={props.game.gameNo}
                userNo={user.userNo}
              />
            </LikeButtonPosition>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    );
  };
  return props.responsive ? (
    <Grid item xs={12} sm={4} md={3} lg={2.5}>
      {insideInfo()}
    </Grid>
  ) : (
    <Box sx={{ width: "178px", mx: 1 }}>{insideInfo()}</Box>
  );
}
