import { apiInstance } from ".";
import { ISearchFilter } from "../page/BoardGame/BoardGameSearch/component/GameFilter";

const api = apiInstance();

// 게임 상세정보 조회
async function getGameDetail(gameNo: number, userNo: number) {
  return (await api.get(`/search/${gameNo}/${userNo}`)).data.data;
}

// 게임 검색
async function SearchByName(searchName: string, userNo: number) {
  return (
    await api.post(`/search/auto`, {
      searchName: searchName,
      userNo: userNo,
    })
  ).data.data;
}

// 필터 검색
async function searchByFilter(data: ISearchFilter) {
  return (await api.post(`/search/filter`, data)).data;
}

export { getGameDetail, SearchByName, searchByFilter };
