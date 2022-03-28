/*
For the application state, we use Redux connect() function with mapStateToProps:
– redirect user to Main page by checking isLoggedIn
– show response message with message
*/
import Form from "./component/Form";
import { Grid } from "@mui/material/";

//통신
/*
import { login } from "../../../actions/auth";
import { connect } from "react-redux";

import Redirect from "react-router-dom";
*/
export default function SignIn() {
  /*form에서 입력한 데이터를 받아온다 : api 연결*/
  const callLoginApi = (email: string, password: string) => {
    //api 연결
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
        <Grid item xs={2} sx={{ flexGrow: 1, m: { xs: 4, md: 0 } }}>
          <Form sendDataToParent={callLoginApi} />
        </Grid>
      </Grid>
    </>
  );
}
