import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../index";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarRating from "../../../../component/StarRating";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
} from "@mui/material";

const StyledCard = styled(Card)(() => ({
  position: "relative",

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

const GameTitle = styled("div")(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  marginBottom: theme.spacing(1),
}));

export default function BoardCard(props: { game: Game }) {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={4} md={3} lg={2}>
      <StyledCard variant="outlined">
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
            <StarRating initStarRate={0} size={26} />
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Grid>
  );
}
