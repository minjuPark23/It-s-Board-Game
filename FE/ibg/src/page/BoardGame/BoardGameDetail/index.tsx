import { Container, Divider } from "@mui/material";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import PageNotFound from "../../../component/PageNotFound";
import GameInfo from "./component/GameInfo";
import ReviewInfo from "./component/ReviewInfo";
import { Game } from "../../Main";

export interface GameDetail extends Game {
  gameNameKr: string;
  gameMinTime: number;
  gameMaxTime: number;
  gameYear: number;
  gameWeight: number;
  gameAge: number;
  gameDesc: string;
}

export interface Review {
  reviewNo: number;
  scoreRating: number;
  userNick: string;
  reviewContent: string;
  reviewReg: string;
}

export default function BoardGameDetail() {
  // const gameNo = useParams().no;
  const [game, setGame] = useState<GameDetail | null>(null);
  const [reviewList, setReviewList] = useState<Review[]>([]);

  // gameNo, userNo를 이용해서 게임 상세 정보 불러오기
  useEffect(() => {
    // API 연결
    setGame(tempData.game);
    setReviewList(tempData.game.ResponseReviewList);
  }, []);

  return (
    <Container>
      {game ? <GameInfo game={game} /> : <PageNotFound />}
      <Divider />

      <ReviewInfo reviewList={reviewList} />
    </Container>
  );
}

// 임시 데이터 => 별점정보, 한글이름 or 영어이름, 게임설명(desc) 필요
const tempData = {
  game: {
    gameNo: 1,
    gameImg:
      "https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg",
    gameNameKr: "디마허",
    gameName: "Die Macher long title very long",
    gameMinPlayer: 3,
    gameMaxPlayer: 5,
    gameMinTime: 240,
    gameMaxTime: 240,
    gameYear: 1986,
    gameWeight: 4.3,
    gameAge: 14,
    gameCategory: "Economic|Negotiation|Political",
    gameDesc:
      "Die Macher is a game about seven sequential political races in different regions of Germany. Players...",
    gameTotalScore: 7.6,
    isLike: true,
    ResponseReviewList: [
      {
        reviewNo: 1,
        scoreRating: 8,
        userNick: "ImUser",
        reviewContent: "이 게임 정말 재밌어요!!!",
        reviewReg: "2022/03/29",
      },
      {
        reviewNo: 2,
        scoreRating: 10,
        userNick: "보드게임조하",
        reviewContent: "제가 제일 좋아하는 게임입니다.",
        reviewReg: "2022/03/29",
      },
    ],
  },
};
