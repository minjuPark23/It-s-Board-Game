import Form from "./component/Form";
import { Grid } from "@mui/material/";

export default function SignIn() {
  const callLoginApi = (email: string, password: string) => {
    alert(email);
    alert(password);
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
