import { apiInstance } from ".";

const api = apiInstance();

// 게임 상세정보 조회
async function getGameDetail(gameNo: number, userNo: number) {
  return (await api.get(`/search/${gameNo}/${userNo}`)).data.data;
}

export { getGameDetail };
