import React from "react";
import Form from "./component/Form";
import { Grid, Typography, Box } from "@mui/material/";

//index에서 api 호출 -> Form에서 index(parent)로 전달

export default function SignUp() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={2}>
        <Form />
      </Grid>
    </Grid>
  );
}
