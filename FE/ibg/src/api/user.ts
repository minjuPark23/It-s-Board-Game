import { apiInstance, loginApiInstance } from "./index";

const api = apiInstance();

// 회원 가입
async function join(email: string, nickname: string, password: string) {
  return await api.post(`/join`, {
    userEmail: email,
    userNick: nickname,
    userPwd: password,
  });
}

//로그인
async function login(email: string, password: string) {
  return await api.post(`/login`, { userEmail: email, userPwd: password });
}

// 회원 정보
async function userInfo(userNo: number) {
  return (await api.get(`/user/account/${userNo}`)).data.data; //유저 객체라 data 썼는데 일단 자료가 들어와바야 알겠다.
}

//이메일 중복 조회
async function checkEmail(email: string) {
  return (await api.post(`/email`, { userEmail: email })).data;
}
//이메일 중복 조회
async function checkNickname(nickname: string) {
  return (await api.post(`/nickname`, { userNick: nickname })).data; //도대체 뭘해야 되는걸까
}

export { join, login, userInfo, checkEmail, checkNickname };
