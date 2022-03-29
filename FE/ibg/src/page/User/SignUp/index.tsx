import { useState } from "react";
import { Grid, Box } from "@mui/material/";
import Form from "./component/Form";
import WelcomeStepper from "../component/WelcomeStepper";
import { useNavigate } from "react-router-dom";
//index에서 api 호출 -> Form에서 index(parent)로 전달
import { join } from "../../../api/user";

export default function SignUp() {
  const [width] = useState(window.innerWidth);
  // 페이지 이동
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); //https://gist.github.com/velopert/a94290c448162b99ad374631e376963c
  const callJoinApi = (nickname: string, email: string, password: string) => {
    //join api 연결
    setLoading(true);
    const res = join(email, nickname, password);
    setLoading(false);
    navigate("/complete");
  };
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
          <Form parentCallback={callJoinApi} />
        </Grid>
      </Grid>
    </>
  );
}
