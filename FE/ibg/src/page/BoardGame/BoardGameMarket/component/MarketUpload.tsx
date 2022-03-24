import React from "react";
import { Button } from "@mui/material";

export default function MarketUpload() {
  return (
      <Button
        style={{ height: 20 }}
        sx = {{top: {md: 28, xs: 10}}}
        color="primary"
      >
        거래등록
      </Button>
  );
}
