/* Creator for actions related to authentication. 
1.  Import AuthService to make async HTTP requests*/
import {
  JOIN_SUCCESS,
  JOIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import AuthService from "../services/auth.service";
import { Dispatch } from "redux";

//회원 API 모음

export const join =
  (email: string, nickname: string, password: string) =>
  (dispatch: Dispatch) => {
    return AuthService.JoinAPI(email, nickname, password).then(
      (response) => {
        dispatch({
          type: JOIN_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: JOIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const login =
  (email: string, password: string) => (dispatch: Dispatch) => {
    return AuthService.LoginAPI(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch: Dispatch) => {
  AuthService.Logout();
  dispatch({
    type: LOGOUT,
  });
};
