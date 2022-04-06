import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ThemeList from "./component/ThemeList";
import {
  getRecommByAge,
  getRecommByCategory,
  getRecommByDesc,
  getRecommByNewbie,
  getRecommByPlayer,
  getRecommByReviews,
  getRecommByScore,
  getRecommByTime,
  getRecommByUser,
  getRecommByWeight,
} from "../../api/recommend";
import { RootStateOrAny, shallowEqual, useSelector } from "react-redux";
import SkelBoardCard from "../../component/SkelBoardCard";
import AliceCarousel from "react-alice-carousel";
import { IGame } from "../../types/IGame";
import LegoSpinner from "../../component/LegoSpinner";
import { Box, Container, Skeleton, Typography } from "@mui/material";

// 테마별 게임리스트: sm(600) 이상(pc)에서는 버튼으로, 이하(모바일)에서는 스크롤로 동작
export default function Main() {
  const userNo = useSelector(
    (state: RootStateOrAny) => state.user.userNo,
    shallowEqual
  );
  const [similarGame, setSimilarGame] = useState("");

  const [userGameList, setUserGameList] = useState<IGame[]>([]);
  const [newbieGameList, setNewbieGameList] = useState<IGame[]>([]);
  const [descGameList, setDescGameList] = useState<IGame[]>([]);
  const [categoryGameList, setCategoryGameList] = useState<IGame[]>([]);
  const [weightGameList, setWeightGameList] = useState<IGame[]>([]);
  const [playerGameList, setPlayerGameList] = useState<IGame[]>([]);
  const [timeGameList, setTimeGameList] = useState<IGame[]>([]);
  const [ageGameList, setAgeGameList] = useState<IGame[]>([]);
  const [reviewGameList, setReviewGameList] = useState<IGame[]>([]);
  const [scoreGameList, setScoreGameList] = useState<IGame[]>([]);

  const [userLoading, setUserLoading] = useState<boolean>(userNo);
  const [reviewLoading, setReviewLoading] = useState<boolean>(true);
  const [scoreLoading, setScoreLoading] = useState<boolean>(true);

  const cardImg = require("../../assets/card.png");
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 한 경우
    if (userNo) {
      getRecommByUser(userNo)
        .then((data) => {
          if (data.code === 200) {
            if (data.data === null) getNewbieGameList();
            else {
              setUserGameList(data.data);
              setUserLoading(false);
            }
          }
        })
        .catch(() => {
          setUserLoading(false);
        });
      // 조금 느림(3)
      getRecommByDesc(userNo)
        .then((data) => {
          if (data.code === 200) {
            setSimilarGame(data.data.title);
            setDescGameList(data.data.recommendResultResponses);
          }
        })
        .catch(() => {});
      // 많이 느림(5)
      getRecommByCategory(userNo)
        .then((data) => {
          if (data.code === 200) {
            setCategoryGameList(data.data);
          }
        })
        .catch(() => {});
      getRecommByWeight(userNo)
        .then((data) => {
          if (data.code === 200) {
            setWeightGameList(data.data);
          }
        })
        .catch(() => {});
      getRecommByPlayer(userNo)
        .then((data) => {
          if (data.code === 200) {
            setPlayerGameList(data.data);
          }
        })
        .catch(() => {});
      getRecommByTime(userNo)
        .then((data) => {
          if (data.code === 200) {
            setTimeGameList(data.data);
          }
        })
        .catch(() => {});
      getRecommByAge(userNo)
        .then((data) => {
          if (data.code === 200) {
            setAgeGameList(data.data);
          }
        })
        .catch(() => {});
    } else {
      setUserGameList([]);
      setNewbieGameList([]);
      setDescGameList([]);
      setCategoryGameList([]);
      setWeightGameList([]);
      setPlayerGameList([]);
      setTimeGameList([]);
      setAgeGameList([]);
    }
    // 공통
    getRecommByReviews(userNo)
      .then((data) => {
        if (data.code === 200) {
          setReviewGameList(data.data);
        }
        setReviewLoading(false);
      })
      .catch(() => {
        setReviewLoading(false);
      });
    getRecommByScore(userNo)
      .then((data) => {
        if (data.code === 200) {
          setScoreGameList(data.data);
        }
        setScoreLoading(false);
      })
      .catch(() => {
        setScoreLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNo]);

  // 초보자를 위한 게임 리스트 가져오기(평점데이터가 10개 미만일 경우(user추천 response = null)에만 실행)
  const getNewbieGameList = () => {
    getRecommByNewbie(userNo)
      .then((data) => {
        if (data.code === 200) {
          setNewbieGameList(data.data);
          setUserLoading(false);
        }
      })
      .catch(() => {
        setUserLoading(false);
      });
  };

  // 페이지 이동
  const movePage = (page: string) => {
    navigate(page);
  };

  const skelCards = [1, 1, 1, 1, 1].map(() => <SkelBoardCard marginX={0.5} />);

  const SkelTheme = () => {
    return (
      <Box sx={{ position: "relative" }}>
        <Skeleton animation="wave" width="30%" height={50} sx={{ mt: 4 }} />
        <AliceCarousel
          paddingLeft={15}
          paddingRight={15}
          items={skelCards}
          disableButtonsControls
          disableDotsControls
          controlsStrategy="responsive"
          responsive={{
            0: { items: 1.5 },
            400: { items: 2 },
            550: { items: 3 },
            700: { items: 4 },
            900: { items: 5 },
          }}
        ></AliceCarousel>
        <LegoSpinner
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    );
  };

  return (
    <Container style={{ padding: 20 }} sx={{ mt: 5 }}>
      {!userNo && (
        <Box
          onClick={() => movePage("/signin")}
          sx={{
            mt: 5,
            py: 1,
            px: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey.200",
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          <img src={cardImg} alt="card" width={50} />
          <Typography
            sx={{ fontSize: { xs: 15, md: 18 }, ml: 0.5 }}
            align="left"
          >
            로그인을 하면,
            <Box component="span" ml={1} sx={{ fontWeight: 600 }}>
              나에게 맞는 보드게임을 추천
            </Box>
            받을 수 있어요!
          </Typography>
        </Box>
      )}

      {userLoading ? (
        <>
          <SkelTheme />
          {/* <SkelTheme /> */}
        </>
      ) : (
        <>
          {userGameList.length > 0 && (
            <ThemeList title="나의 맞춤 추천 게임" gameList={userGameList} />
          )}
          {newbieGameList.length > 0 && (
            <ThemeList
              title="초보자라면 이 게임 어때요?"
              gameList={newbieGameList}
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
            <ThemeList
              title="내가 즐겨하는 나이대의 게임"
              gameList={ageGameList}
            />
          )}
          {descGameList.length > 0 && (
            <ThemeList
              title={`'${similarGame}'와/과 비슷한 게임 추천`}
              gameList={descGameList}
            />
          )}
          {categoryGameList.length > 0 && (
            <ThemeList
              title="내가 좋아하는 카테고리의 게임"
              gameList={categoryGameList}
            />
          )}
        </>
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
