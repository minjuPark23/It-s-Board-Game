/* Auth Reudcer는 isLoggedIn 과 유저 state를 업데이트 한다*/

import {
  JOIN_SUCCESS,
  JOIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";
const user = JSON.parse(localStorage.getItem("user") || "Default Value");
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

//일단 any로 타입 설정했지만, 안된다면 인터페이스 만들어야할것같다. 하지만 action을 정하는데..ㅜㅜ

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case JOIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case JOIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
