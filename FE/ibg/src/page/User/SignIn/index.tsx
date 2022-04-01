import Form from "./component/Form";
import { Grid } from "@mui/material/";
import React, {useState } from "react";
import { login, userInfo } from "../../../api/user";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface MyToken {
  userNo: number;
  exp: number;
  userEmail: string; //이메일
  // whatever else is in the JWT.
}
export default function SignIn() {
  /*form에서 입력한 데이터를 받아온다 : api 연결*/
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const init = async (
    email: string,
    password: string,
    userNick: string,
    userNo: number
  ) => {
    dispatch({
      type: "login",
      userData: { email, password, userNick, userNo },
    });
  };

  //api 연결
  const callLoginApi = async (email: string, password: string) => {
    sessionStorage.removeItem("accessToken");
    await login(email, password).then((response) => {
      if (response.data.code === 200) {
        // alert(response.data.code);
        let token = response.headers.authorization;
        let decode_token = jwtDecode<MyToken>(token);
        sessionStorage.setItem("accessToken", token);

        //userNO : alert(decode_token.userNo);
        setLoading(true);
        userInfo(decode_token.userNo)
          .then((response) => {
            console.log(response);
            let userNick = response.userNick;
            let userNo = response.userNo;
            //alert("dispatch");
            init(email, password, userNick, userNo);
            // alert("navigate");
            navigate("/");
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoading(false);
      } else {
        alert("이메일 또는 비밀번호를 확인해주세요");
      }
    });
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        {loading ? ("loading"):(
        <Grid item xs={2} sx={{ flexGrow: 1, m: { xs: 4, md: 0 } }}>
          <Form sendDataToParent={callLoginApi} />
        </Grid>
        )}
      </Grid>
    </>
  );
}
