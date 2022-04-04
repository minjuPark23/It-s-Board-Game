import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetail } from "../../../api/game";
import { getReviewList } from "../../../api/review";
import GameInfo from "./component/GameInfo";
import ReviewInfo from "./component/ReviewInfo";
import PageNotFound from "../../../component/PageNotFound";
import { Game } from "../../Main";
import { Container, Divider } from "@mui/material";
import { RootStateOrAny, useSelector } from "react-redux";
import SkelGameInfo from "./component/SkelGameInfo";

export interface GameDetail extends Game {
  gameNameKr: string;
  gameMinTime: number;
  gameMaxTime: number;
  gameYear: number;
  gameWeight: number;
  gameAge: number;
  gameDesc: string;
  gameKorDesc: string;
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
  const userNo = useSelector((state: RootStateOrAny) => state.user.userNo);
  const [game, setGame] = useState<GameDetail | null>(null);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // gameNo, userNo를 이용해서 게임 상세 정보 불러오기
  useEffect(() => {
    getGameDetail(gameNo, userNo || 0)
      .then((data) => {
        setGame(data);
        setReviewList(data.responseReviewList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [gameNo, userNo]);

  const refreshReview = () => {
    getReviewList(gameNo).then((data) => {
      setReviewList(data);
    });
  };

  return (
    <Container>
      {loading ? (
        <SkelGameInfo />
      ) : game ? (
        <>
          <GameInfo game={game} />
          <Divider />

          <ReviewInfo
            reviewList={reviewList}
            gameNo={gameNo}
            userNo={userNo}
            addCallback={refreshReview}
          />
        </>
      ) : (
        <PageNotFound />
      )}
    </Container>
  );
}
