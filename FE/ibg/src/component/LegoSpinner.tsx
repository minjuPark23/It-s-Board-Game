import { Box, styled, SxProps } from "@mui/material";

const SpriteImage = styled(Box)(() => ({
  width: "150px",
  height: "114.5px",
  background: "url('img/spinner.png') no-repeat 0 0 / auto 114.5px",
  animation: "play 1.5s steps(14) infinite",
  "@keyframes play": {
    "0%": {
      backgroundPosition: "0 0",
    },
    "100%": {
      backgroundPosition: "-2100px 0",
    },
  },
}));

export default function LegoSpinner(props: { sx?: SxProps }) {
  return <SpriteImage sx={props.sx} />;
}
