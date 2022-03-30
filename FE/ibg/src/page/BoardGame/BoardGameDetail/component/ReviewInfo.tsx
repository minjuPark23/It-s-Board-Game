import { Typography, TextField, Box, Button, styled } from "@mui/material";
import React, { useState } from "react";
import { Review } from "..";
import ReviewItem from "./ReviewItem";

export default function Reviews(props: { reviewList: Review[] }) {
  const [newReview, setNewReview] = useState("");

  const onChangeNewReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(e.target.value);
  };

  return (
    <Box sx={{ my: { xs: 2, md: 4 } }}>
      <Typography
        sx={{ fontSize: { xs: 16, md: 21 }, fontWeight: "bold", mb: 1 }}
      >
        리뷰
        <Typography component="span">({props.reviewList.length})</Typography>
      </Typography>
      <TextField
        fullWidth
        multiline
        maxRows={5}
        onChange={onChangeNewReview}
      ></TextField>
      <Box sx={{ textAlign: "right", my: 1 }}>
        {newReview ? (
          <Button variant="contained" sx={{ padding: 0.3 }}>
            등록
          </Button>
        ) : (
          <Button disabled variant="contained" sx={{ padding: 0.3 }}>
            등록
          </Button>
        )}
      </Box>
      {props.reviewList.map((review) => (
        <ReviewItem key={review.reviewNo} review={review} />
      ))}
    </Box>
  );
}
