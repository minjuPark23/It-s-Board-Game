import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@mui/material/";

interface User {
  sendDataToParent: (email: string, password: string) => void;
}

function Form({ sendDataToParent }: User) {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);
  /*비밀번호 */
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(!checked); //not true = checked. true = checked
  };
  let prevSave = "";
  /* 이메일 검사 */
  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail);
      setIsRemember(true);
      prevSave = email;
    }
  }, []);

  const saveEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      //alert("remember" + email + " " + e.target.checked);
      setCookie("rememberEmail", email, { maxAge: 2000 });
    } else {
      removeCookie("rememberEmail");
    }
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const emailValidation = () => {
    let check = /@/;
    return !check.test(email) && email.length > 1;
  };
  const sendData = () => {
    if (password.length != 0 && email.length != 0) {
      {
        if (isRemember && prevSave != email) {
          //원래 저장된 이메일과 다른 email을 저장하는 경우 */
          removeCookie("rememberEmail");
          setCookie("rememberEmail", email, { maxAge: 2000 });
        }
        sendDataToParent(email, password); //전달
      }
    }
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={onChangePassword}
                value={password}
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
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Checkbox
                  checked={isRemember}
                  onChange={saveEmail}
                  name="이메일 저장"
                  value="이메일 저장"
                />
              }
              label="이메일 저장"
            />
            <Grid>
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
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default Form;
