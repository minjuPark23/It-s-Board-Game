import React from "react";
import { Button } from "@mui/material";
type Props = {
  value: number;
};

export default function CheckButton({ value }: Props) {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size={value < 600 ? "small" : "large"}
        sx={{ py: 2 }}
      >
        중복확인
      </Button>
    </>
  );
}
