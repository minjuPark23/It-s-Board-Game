import { useState } from "react";
import { Grid, Box } from "@mui/material/";
import Form from "./component/Form";
import WelcomeStepper from "../component/WelcomeStepper";
//index에서 api 호출 -> Form에서 index(parent)로 전달
import {
  join,
  checkEmail,
  checkNickname,
  userInfo,
  login,
} from "../../../api/user";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
interface MyToken {
  userNo: number;
  exp: number;
  userEmail: string; //이메일
}
export default function SignUp() {
  const [width] = useState(window.innerWidth);

  const [loading, setLoading] = useState(false); //https://gist.github.com/velopert/a94290c448162b99ad374631e376963c
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //api 연결
  const callJoinApi = (nickname: string, email: string, password: string) => {
    console.log(loading); // => loading never used 빌드 경고 해결을 위해 추가했음
    setLoading(true);

    // const joinRes =    => 빌드 경고(never used)
    join(email, nickname, password).then((codeRes) => {
      sessionStorage.removeItem("accessToken");
      login(email, password).then((response) => {
        if (response.data.code === 200) {
          alert(response.data.code);

          let token = response.headers.authorization;
          let decode_token = jwtDecode<MyToken>(token);
          sessionStorage.setItem("accessToken", token);

          alert(decode_token.userNo);
          setLoading(true);
          userInfo(decode_token.userNo)
            .then((response) => {
              console.log(response);
              let userNick = response.userNick;
              let userNo = response.userNo;

              dispatch({
                type: "login",
                userData: { email, password, userNick, userNo },
              });

              // alert("navigate");
              navigate("/survey");
              window.location.reload();
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
    });
    setLoading(false);
    navigate(`/survey`);
    //window.history.pushState("", "", "/survey");
  };
  /*이메일 중복체크 */
  const emailCheck = (email: string) => {
    // const emailRes =   => 빌드 경고(never used)
    checkEmail(email).then((codeRes) => {
      if (codeRes.code === 200) {
        alert("사용 가능한 이메일 입니다.");
      } else {
        alert("사용 불가능한 이메일입니다.");
      }
    });
  };
  /* 닉네임 중복체크*/
  const nicknameCheck = (nickname: string) => {
    // const nicknameRes =     => 빌드 경고(never used)
    checkNickname(nickname).then((codeRes) => {
      if (codeRes.code === 200) {
        alert("사용 가능한 닉네임 입니다.");
      } else alert("사용 불가능한 닉네임입니다.");
    });
  };

  //랜더링
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ mt: { xs: 1, sm: 5, md: 8 } }}
      >
        <Box sx={{ width: width < 600 ? "90%" : "33%" }}>
          <WelcomeStepper value="0" />
        </Box>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "70vh" }}
      >
        <Grid
          item
          xs={2}
          sx={{ flexGrow: 1, m: { xs: 2, md: 3 }, mt: { xs: 5 } }}
        >
          <Form
            parentCallback={callJoinApi}
            emailCallback={emailCheck}
            nicknameCallback={nicknameCheck}
          />
        </Grid>
      </Grid>
    </>
  );
}
