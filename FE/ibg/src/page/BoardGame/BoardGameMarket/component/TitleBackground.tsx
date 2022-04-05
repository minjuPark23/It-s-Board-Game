import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { bgcolor } from "@mui/system";
import Title from "./Title";
interface Title {
  title: string;
}
export default function TitleBackground() {
  return (
    <Box
      sx={{
        width: 1,
        height: { md: "70px", xs: "100px" },
        position: "absolute",
        display: "block",
      }}
      bgcolor="#FCB500"
    >
      <Title />
    </Box>
  );
}
