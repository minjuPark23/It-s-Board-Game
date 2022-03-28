import axios from "types-axios";
const API_URL = "http://localhost:8080/"; //바꾸기(base url임)

class AuthService {
  LoginAPI(email: string, password: string) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  Logout() {
    localStorage.removeItem("user");
  }
  JoinAPI(email: string, nickname: string, password: string) {
    return axios.post(API_URL + "join", {
      email,
      nickname,
      password,
    });
  }
}
export default new AuthService();
