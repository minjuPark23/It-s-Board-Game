import { useEffect, useState } from "react";
import { Box, Container, Skeleton } from "@mui/material";
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
import SkelBoardCard from "../../component/SkelBoardCard";
import AliceCarousel from "react-alice-carousel";

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

  const [userLoading, setUserLoading] = useState<boolean>(userNo);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(userNo);
  const [weightLoading, setWeightLoading] = useState<boolean>(userNo);
  const [playerLoading, setPlayerLoading] = useState<boolean>(userNo);
  const [timeLoading, setTimeLoading] = useState<boolean>(userNo);
  const [ageLoading, setAgeLoading] = useState<boolean>(userNo);
  const [newbieLoading, setNewbieLoading] = useState<boolean>(true);
  const [reviewLoading, setReviewLoading] = useState<boolean>(true);
  const [scoreLoading, setScoreLoading] = useState<boolean>(true);

  useEffect(() => {
    // 로그인 한 경우
    if (userNo) {
      getRecommByUser(userNo).then((data) => {
        if (data.code === 200) {
          setUserGameList(data.data);
        }
        setUserLoading(false);
      });
      getRecommByCategory().then((data) => {
        if (data.code === 200) {
          setCategoryGameList(data.data);
        }
        setCategoryLoading(false);
      });
      getRecommByWeight().then((data) => {
        if (data.code === 200) {
          setWeightGameList(data.data);
        }
        setWeightLoading(false);
      });
      getRecommByPlayer().then((data) => {
        if (data.code === 200) {
          setPlayerGameList(data.data);
        }
        setPlayerLoading(false);
      });
      getRecommByTime().then((data) => {
        if (data.code === 200) {
          setTimeGameList(data.data);
        }
        setTimeLoading(false);
      });
      getRecommByAge().then((data) => {
        if (data.code === 200) {
          setAgeGameList(data.data);
        }
        setAgeLoading(false);
      });
    }
    // 공통
    getRecommByNewbie().then((data) => {
      if (data.code === 200) {
        setNewbieGameList(data.data);
      }
      setNewbieLoading(false);
    });
    getRecommByReviews().then((data) => {
      if (data.code === 200) {
        setReviewGameList(data.data);
      }
      setReviewLoading(false);
    });
    getRecommByScore().then((data) => {
      if (data.code === 200) {
        setScoreGameList(data.data);
      }
      setScoreLoading(false);
    });
  }, [userNo]);

  const skelCards = [1, 1, 1, 1, 1, 1].map(() => (
    <SkelBoardCard marginX={0.5} />
  ));

  const SkelTheme = () => {
    return (
      <>
        <Skeleton width="30%" height={50} sx={{ mt: 4 }} />
        <AliceCarousel
          paddingLeft={15}
          paddingRight={15}
          items={skelCards}
          disableDotsControls
          controlsStrategy="responsive"
          responsive={{
            0: { items: 1.5 },
            400: { items: 2 },
            550: { items: 3 },
            700: { items: 4 },
            900: { items: 5 },
            1200: { items: 6 },
          }}
        />
      </>
    );
  };

  return (
    <Container style={{ padding: 20 }}>
      {userLoading ? (
        <SkelTheme />
      ) : (
        userGameList.length > 0 && (
          <ThemeList title="나의 맞춤 추천 게임" gameList={userGameList} />
        )
      )}
      {categoryLoading ? (
        <SkelTheme />
      ) : (
        categoryGameList.length > 0 && (
          <ThemeList
            title="내가 좋아하는 카테고리의 게임"
            gameList={categoryGameList}
          />
        )
      )}
      {weightLoading ? (
        <SkelTheme />
      ) : (
        weightGameList.length > 0 && (
          <ThemeList
            title="내가 좋아하는 난이도의 게임"
            gameList={weightGameList}
          />
        )
      )}

      {playerLoading ? (
        <SkelTheme />
      ) : (
        playerGameList.length > 0 && (
          <ThemeList
            title="내가 즐겨하는 인원 수의 게임"
            gameList={playerGameList}
          />
        )
      )}

      {timeLoading ? (
        <SkelTheme />
      ) : (
        timeGameList.length > 0 && (
          <ThemeList
            title="내가 즐겨하는 플레이 시간의 게임"
            gameList={timeGameList}
          />
        )
      )}

      {ageLoading ? (
        <SkelTheme />
      ) : (
        ageGameList.length > 0 && (
          <ThemeList
            title="내가 즐겨하는 나이대의 게임"
            gameList={ageGameList}
          />
        )
      )}
      {newbieLoading ? (
        <SkelTheme />
      ) : (
        newbieGameList.length > 0 && (
          <ThemeList
            title="초보자라면 이 게임 어때요?"
            gameList={newbieGameList}
          />
        )
      )}
      {scoreLoading ? (
        <SkelTheme />
      ) : (
        scoreGameList.length > 0 && (
          <ThemeList title="이보게 평점이 높은 게임" gameList={scoreGameList} />
        )
      )}
      {reviewLoading ? (
        <SkelTheme />
      ) : (
        reviewGameList.length > 0 && (
          <ThemeList title="리뷰가 많은 게임" gameList={reviewGameList} />
        )
      )}
    </Container>
  );
}
