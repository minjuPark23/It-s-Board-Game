import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Grid,
} from "@mui/material";

interface Game {
  game: {
    gameNo: number;
    gameImg: string;
    gameName: string;
    gameMinPlayer: number;
    gameMaxPlayer: number;
    // gameMinTime: number;
    // gameMaxTime: number;
    // gameYear: number;
    // gameWeight: number;
    // gameAge: number;
    gameCategory: string;
    // gameDesc: string;
    gameTotalScore: number;
    isLike: boolean;
  };
}

const ImgWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 0,
  overflow: "hidden",
  paddingBottom: "100%",
}));

export default function BoardCard({ game }: Game) {
  return (
    <Grid item xs={12} sm={4} md={3} lg={2.5}>
      <Card>
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
              image={game.gameImg}
              alt={game.gameName}
            />
          </ImgWrapper>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {game.gameName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
