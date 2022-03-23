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
import CheckButton from "../../component/CheckButton";

function Form() {
  const [width, setWidth] = useState(window.innerWidth);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [agreement] = useState("");
  let agreed = false;
  /*비밀번호 유효 검사 */
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const passwordValidation = () => {
    return password.length < 6 && password.length > 1;
  };
  /*비밀번호 확인 */
  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  const passwordCheckValidation = () => {
    return password !== passwordCheck && passwordCheck.length > 1;
  };
  /*약관 확인 */
  const agreementCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    agreed = e.target.checked;
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
          회원가입
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={9} sm={9}>
              <Email />
            </Grid>
            <Grid item xs={3} sm={3}>
              <CheckButton value={width} />
            </Grid>
            <Grid item xs={9} sm={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="닉네임 입력"
                name="nickname"
                autoComplete="nickname"
                autoFocus
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <CheckButton value={width} />
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
                  passwordValidation() ? "최소 6글자 이상 입력하세요" : ""
                }
                name="password"
                label="비밀번호 입력"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={onChangePasswordCheck}
                value={passwordCheck}
                error={passwordCheckValidation()}
                helperText={
                  passwordCheckValidation()
                    ? "비밀번호가 일치하지 않습니다"
                    : ""
                }
                name="passwordCheck"
                label="비밀번호 확인"
                type="password"
                id="passwordCheck"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={agreement}
                    color="primary"
                    onChange={agreementCheck}
                  />
                }
                label="개인정보 동의"
              ></FormControlLabel>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ py: 2 }}
            onClick={sendData}
            // className={classes.submit}
          >
            회원가입
          </Button>
        </form>
        <Grid sx={{ py: 1 }}>
          <Link to="/signin" replace>
            이미 계정이 있으신가요?
          </Link>
        </Grid>
      </div>
    </Container>
  );
}
export default Form;
