import { Review } from "..";

import { Box, Typography, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ReviewItem(props: { review: Review }) {
  return (
    <>
      <Box sx={{ px: 0.8, py: 1.5, position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: 14, md: 17 }, fontWeight: "bold", mr: 2 }}
          >
            {props.review.userNick}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: 13, md: 16 },
              color: "gray",
            }}
          >
            <StarIcon color="warning" /> {props.review.scoreRating}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: { xs: 12, md: 15 }, mt: 0.7 }}>
          {props.review.reviewContent}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 11, md: 14 },
            position: "absolute",
            top: 10,
            right: 5,
            color: "gray",
          }}
        >
          {props.review.reviewReg}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}
