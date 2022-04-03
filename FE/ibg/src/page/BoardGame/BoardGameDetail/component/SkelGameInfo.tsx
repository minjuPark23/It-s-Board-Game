import { Divider, Grid, Skeleton, Typography } from "@mui/material";

export default function SkelGameInfo() {
  return (
    <>
      <Grid container spacing={2} sx={{ my: { xs: 0, md: 4 } }}>
        <Grid item xs={12} sm={4}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ paddingBottom: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography
            width="40%"
            sx={{ fontSize: { xs: 18, md: 25 }, fontWeight: "bold" }}
          >
            <Skeleton />
          </Typography>
          <Typography
            width="30%"
            sx={{ fontSize: { xs: 13, md: 16 }, color: "gray", mb: 1.5 }}
          >
            <Skeleton />
          </Typography>
          <Skeleton width="50%" />
          <Skeleton width="50%" />
          <Skeleton width="50%" />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Grid>
      </Grid>
      <Divider />

      {[1, 1, 1].map(() => (
        <>
          <Typography sx={{ fontSize: 17, mt: 5 }}>
            <Skeleton width="15%" />
          </Typography>
          <Skeleton />
          <Skeleton />
          <Skeleton width="80%" />
          <Divider />
        </>
      ))}
    </>
  );
}
