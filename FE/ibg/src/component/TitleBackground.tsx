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
        display: "flex",
        cursor: "pointer",
      }}
      bgcolor="#FCB500"
    >
      <Typography
        sx={{
          fontSize: { xs: 20, md: 36 },
          fontWeight: "bold",
          color: "white",
          mt: { md: 1, xs: 7 },
          ml: { md: 44, xs: 4 },
          mb: 1,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
