import React, { useState } from "react";
import Form from "./component/Form";
import { Grid, Box } from "@mui/material/";
import WelcomeStepper from "../component/WelcomeStepper";
//index에서 api 호출 -> Form에서 index(parent)로 전달

export default function SignUp() {
  const [width] = useState(window.innerWidth);
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Box sx={{ width: width < 600 ? "100%" : "33%" }}>
          <WelcomeStepper value="0" />
        </Box>

        <Grid item xs={2}>
          <Form />
        </Grid>
      </Grid>
    </>
  );
}
