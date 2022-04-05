import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { bgcolor } from "@mui/system";
interface Title {
  title: string;
}
export default function TitleBackground({ title }: Title) {
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
      <Typography
        sx={{
          mt: { md: 1, xs: 7 },
          ml: { md: 44, xs: 4 },
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
          mb: 1,
        }}
        color={"white"}
      >
        {title}
      </Typography>
    </Box>
  );
}
