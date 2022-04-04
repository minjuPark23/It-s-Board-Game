import { useState } from "react";
import { Grid, Box } from "@mui/material/";
import Form from "./component/Form";
import WelcomeStepper from "../component/WelcomeStepper";
//index에서 api 호출 -> Form에서 index(parent)로 전달
import { join, checkEmail, checkNickname } from "../../../api/user";

export default function SignUp() {
  const [width] = useState(window.innerWidth);

  const [loading, setLoading] = useState(false); //https://gist.github.com/velopert/a94290c448162b99ad374631e376963c

  //api 연결
  const callJoinApi = (nickname: string, email: string, password: string) => {
    console.log(loading); // => loading never used 빌드 경고 해결을 위해 추가했음
    setLoading(true);

    // const joinRes =    => 빌드 경고(never used)
    join(email, nickname, password).then((codeRes) => {});
    setLoading(false);

    // navigate(`/survey`);
    window.history.pushState("", "", "/survey");
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
