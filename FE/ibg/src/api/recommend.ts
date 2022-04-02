import { apiInstance } from ".";

const api = apiInstance();

// 사용자 맞춤 추천
async function getRecommByUser(userNo: number) {
  return (await api.get(`/game/score/${userNo}`)).data;
}

// 리뷰 많은 순
async function getRecommByReviews() {
  return (await api.get(`/game/review`)).data;
}

// 평점 높은 순
async function getRecommByScore() {
  return (await api.get(`/game/ranking`)).data;
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
  getRecommByReviews,
  getRecommByScore,
  getRecommByCategory,
  getRecommByWeight,
  getRecommByPlayer,
  getRecommByTime,
  getRecommByAge,
  getRecommByNewbie,
};
