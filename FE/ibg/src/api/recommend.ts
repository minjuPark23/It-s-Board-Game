import { apiInstance } from ".";

const api = apiInstance();

// 사용자 맞춤 추천
async function getRecommByUser(userNo: number) {
  return (await api.get(`/game/score/${userNo}`)).data;
}

// 사용자가 한 게임(랜덤)과 비슷한 게임 추천(게임 설명에서 비슷한 단어가 나오는 것들)
// 예) "Clue"와 비슷한 게임 추천  => Clue 명은 response data List의 첫번째(0번 인덱스)로 포함됨
async function getRecommByDesc(userNo: number) {
  return (await api.get(`/game/desc/${userNo}`)).data;
}

// 리뷰 많은 순(공통)
async function getRecommByReviews() {
  return (await api.get(`/game/review/`)).data;
}

// 평점 높은 순(공통)
async function getRecommByScore(userNo: number) {
  return (await api.get(`/game/ranking/${userNo ? userNo : 0}`)).data;
}

// 카테고리별 추천
async function getRecommByCategory() {
  return (await api.get(`/game/category`)).data;
}

// 난이도별 추천
async function getRecommByWeight() {
  return (await api.get(`/game/weight`)).data;
}

// 인원수별 추천
async function getRecommByPlayer() {
  return (await api.get(`/game/player`)).data;
}

// 플레이 시간별 추천
async function getRecommByTime() {
  return (await api.get(`/game/time`)).data;
}

// 나이대별 추천
async function getRecommByAge() {
  return (await api.get(`/game/age`)).data;
}

// 초보자 추천
async function getRecommByNewbie() {
  return (await api.get(`/game/newbie`)).data;
}

export {
  getRecommByUser,
  getRecommByDesc,
  getRecommByReviews,
  getRecommByScore,
  getRecommByCategory,
  getRecommByWeight,
  getRecommByPlayer,
  getRecommByTime,
  getRecommByAge,
  getRecommByNewbie,
};
