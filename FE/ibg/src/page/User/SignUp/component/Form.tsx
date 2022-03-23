import React, { useState, useEffect } from "react";
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
import CheckButton from "../../component/CheckButton";

interface User {
  parentCallback: (nickname: string, email: string, password: string) => void;
}

function Form({ parentCallback }: User) {
  const [width, setWidth] = useState(window.innerWidth);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [agreement] = useState("");

  let agreed = false;
  /* 닉네임 검사 */
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const nicknameValidation = () => {
    return nickname.length == 1;
  };
  /* 이메일 검사 */
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const emailValidation = () => {
    let check = /@/;
    return !check.test(email) && email.length > 1;
  };
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
    else parentCallback(nickname, email, password); // 전달
  };

  /*랜더링 */
  return (
    <Container component="main" maxWidth="sm">
      <div>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            py: 4,
            px: 1,
            pb: { xs: 2 },
            pt: { xs: -3 },
            display: { xs: "none", sm: "flex" },
          }}
          fontWeight={"bold"}
        >
          회원가입
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={9} sm={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                onChange={onChangeEmail}
                value={email}
                error={emailValidation()}
                helperText={
                  emailValidation() ? "올바른 이메일형식이 아닙니다" : ""
                }
                label="이메일 주소 입력"
                name="email"
                autoComplete="email"
                autoFocus
              />
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
                onChange={onChangeNickname}
                value={nickname}
                error={nicknameValidation()}
                helperText={
                  nicknameValidation()
                    ? "닉네임은 두글자 이상이여야 합니다"
                    : ""
                }
                label="닉네임 입력"
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
