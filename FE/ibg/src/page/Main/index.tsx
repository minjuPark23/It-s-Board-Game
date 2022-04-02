import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import ThemeList from "./component/ThemeList";
import {
  getRecommByAge,
  getRecommByCategory,
  getRecommByNewbie,
  getRecommByPlayer,
  getRecommByReviews,
  getRecommByScore,
  getRecommByTime,
  getRecommByUser,
  getRecommByWeight,
} from "../../api/recommend";
import { RootStateOrAny, useSelector } from "react-redux";

// Game 객체 => types파일로 빼는 것이 좋음
export interface Game {
  gameNo: number;
  gameImg: string;
  gameName: string;
  gameKorName: string;
  gameMinPlayer: number;
  gameMaxPlayer: number;
  gameCategory: string;
  gameTotalScore: number;
  like: boolean;
}

// 테마별 게임리스트: sm(600) 이상(pc)에서는 버튼으로, 이하(모바일)에서는 스크롤로 동작
export default function Main() {
  const userNo = useSelector((state: RootStateOrAny) => state.user.userNo);
  const [userGameList, setUserGameList] = useState<Game[]>([]);
  const [categoryGameList, setCategoryGameList] = useState<Game[]>([]);
  const [weightGameList, setWeightGameList] = useState<Game[]>([]);
  const [playerGameList, setPlayerGameList] = useState<Game[]>([]);
  const [timeGameList, setTimeGameList] = useState<Game[]>([]);
  const [ageGameList, setAgeGameList] = useState<Game[]>([]);
  const [newbieGameList, setNewbieGameList] = useState<Game[]>([]);
  const [reviewGameList, setReviewGameList] = useState<Game[]>([]);
  const [scoreGameList, setScoreGameList] = useState<Game[]>([]);

  useEffect(() => {
    // 로그인 한 경우
    if (userNo) {
      getRecommByUser(userNo).then((data) => {
        if (data.code === 200) {
          setUserGameList(data.data);
        }
      });
      getRecommByCategory().then((data) => {
        if (data.code === 200) {
          setCategoryGameList(data.data);
        }
      });
      getRecommByWeight().then((data) => {
        if (data.code === 200) {
          setWeightGameList(data.data);
        }
      });
      getRecommByPlayer().then((data) => {
        if (data.code === 200) {
          setPlayerGameList(data.data);
        }
      });
      getRecommByTime().then((data) => {
        if (data.code === 200) {
          setTimeGameList(data.data);
        }
      });
      getRecommByAge().then((data) => {
        if (data.code === 200) {
          setAgeGameList(data.data);
        }
      });
    }
    // 공통
    getRecommByNewbie().then((data) => {
      if (data.code === 200) {
        setNewbieGameList(data.data);
      }
    });
    getRecommByReviews().then((data) => {
      if (data.code === 200) {
        setReviewGameList(data.data);
      }
    });
    getRecommByScore().then((data) => {
      if (data.code === 200) {
        setScoreGameList(data.data);
      }
    });
  }, []);

  return (
    <Container style={{ padding: 20 }}>
      {userGameList.length > 0 && (
        <ThemeList title="나의 맞춤 추천 게임" gameList={userGameList} />
      )}
      {categoryGameList.length > 0 && (
        <ThemeList
          title="내가 좋아하는 카테고리의 게임"
          gameList={categoryGameList}
        />
      )}
      {weightGameList.length > 0 && (
        <ThemeList
          title="내가 좋아하는 난이도의 게임"
          gameList={weightGameList}
        />
      )}
      {playerGameList.length > 0 && (
        <ThemeList
          title="내가 즐겨하는 인원 수의 게임"
          gameList={playerGameList}
        />
      )}
      {timeGameList.length > 0 && (
        <ThemeList
          title="내가 즐겨하는 플레이 시간의 게임"
          gameList={timeGameList}
        />
      )}
      {ageGameList.length > 0 && (
        <ThemeList title="내가 즐겨하는 나이대의 게임" gameList={ageGameList} />
      )}
      {newbieGameList.length > 0 && (
        <ThemeList
          title="초보자라면 이 게임 어때요?"
          gameList={newbieGameList}
        />
      )}
      {scoreGameList.length > 0 && (
        <ThemeList title="이보게 평점이 높은 게임" gameList={scoreGameList} />
      )}
      {reviewGameList.length > 0 && (
        <ThemeList title="리뷰가 많은 게임" gameList={reviewGameList} />
      )}
    </Container>
  );
}
