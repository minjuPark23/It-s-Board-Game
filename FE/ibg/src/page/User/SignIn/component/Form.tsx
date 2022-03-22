import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@mui/material/";
import Email from "../../component/Email";

function Form() {
  const [width, setWidth] = useState(window.innerWidth);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [agreement] = useState("");
  let agreed = false;
  /*비밀번호 검사 */
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const passwordValidation = () => {
    return password.length < 1;
  };

  const sendData = () => {
    if (!agreed) alert("개인정보 약관에 동의해주세요");
    //이제 이 값들을 부모에 주면 됨 api : string, string, string임
  };

  /*랜더링 */
  return (
    <Container component="main" maxWidth="sm">
      <div>
        <Typography
          component="h1"
          variant="h4"
          sx={{ py: 4, px: 1 }}
          fontWeight={"bold"}
        >
          로그인
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Email />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={onChangePassword}
                value={password}
                error={passwordValidation()}
                helperText={
                  passwordValidation() ? "비밀번호를 입력해주세요" : ""
                }
                name="password"
                label="비밀번호 입력"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={sendData}
              sx={{ my: 2 }}
            >
              로그인
            </Button>
          </Grid>

          <Button
            component={Link}
            to="/signup"
            fullWidth
            variant="outlined"
            color="primary"
            size="large"

            // className={classes.submit}
          >
            회원가입
          </Button>
        </form>
      </div>
    </Container>
  );
}
export default Form;
