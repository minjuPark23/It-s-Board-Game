import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetail } from "../../../api/game";
import GameInfo from "./component/GameInfo";
import ReviewInfo from "./component/ReviewInfo";
import PageNotFound from "../../../component/PageNotFound";
import { Game } from "../../Main";
import { Container, Divider } from "@mui/material";
import { RootStateOrAny, useSelector } from "react-redux";

export interface GameDetail extends Game {
  gameNameKr: string;
  gameMinTime: number;
  gameMaxTime: number;
  gameYear: number;
  gameWeight: number;
  gameAge: number;
  gameDesc: string;
  myScore: number;
}

export interface Review {
  reviewNo: number;
  scoreRating: number;
  userNick: string;
  reviewContent: string;
  reviewReg: string;
}

export default function BoardGameDetail() {
  const gameNo = Number(useParams().no);
  const user = useSelector((state: RootStateOrAny) => state.user);
  const [game, setGame] = useState<GameDetail | null>(null);
  const [reviewList, setReviewList] = useState<Review[]>([]);

  // gameNo, userNo를 이용해서 게임 상세 정보 불러오기
  useEffect(() => {
    getGameDetail(gameNo, user.userNo || 0).then((data) => {
      setGame(data);
      setReviewList(data.responseReviewList);
    });
  }, [gameNo, user.userNo]);

  return (
    <Container>
      {game ? <GameInfo game={game} /> : <PageNotFound />}
      <Divider />

      <ReviewInfo reviewList={reviewList} />
    </Container>
  );
}
