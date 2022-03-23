import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material/";
import Email from "../../component/Email";

function Form() {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);

  let passwordError = "";
  let emailError = "";

  /*비밀번호 */
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(!checked); //not true = checked. true = checked
  };

  const sendData = () => {
    // if (password.length == 0) alert("이이이");
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
                  checked={checked}
                  onChange={handleChange}
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
