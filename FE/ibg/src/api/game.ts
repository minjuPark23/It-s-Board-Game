import { apiInstance } from ".";

const api = apiInstance();

async function getGameDetail(gameNo: number, userNo: number) {
  return (await api.get(`/search/${gameNo}/${userNo}`)).data.data;
}

export { getGameDetail };
