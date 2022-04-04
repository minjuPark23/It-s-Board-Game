import axios from "axios";
import { API_BASE_URL } from "../config/index";

function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}
function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);
  return color;
}
function loginApiInstance() {
  const jwtToken = sessionStorage.getItem("accessToken");
  sessionStorage.setItem("avatarColor", randomColor());
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
      Authorization: `${jwtToken}`,
    },
  });
  return instance;
}

export { apiInstance, loginApiInstance };
