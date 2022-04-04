import BoardCardMain from "../../../component/BoardCardMain";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Box, styled, Typography } from "@mui/material";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Game } from "..";

const ArrowBox = styled(Box)(({ theme }) => ({
  width: 35,
  height: 35,
  textAlign: "center",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[600],
  cursor: "pointer",
}));

export default function ThemeList(props: { title: string; gameList: Game[] }) {
  const cards = props.gameList.map((game) => (
    <BoardCardMain key={game.gameNo} game={game} marginX={0.5}></BoardCardMain>
  ));

  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: 20, md: 24 },
          fontWeight: "bold",
          mt: 4,
          mb: 1,
        }}
      >
        {props.title}
        {/* <HelpOutlineIcon sx={{ verticalAlign: "-0.2rem", ml: 1 }} /> */}
      </Typography>
      <AliceCarousel
        paddingLeft={15}
        paddingRight={15}
        items={cards}
        disableDotsControls
        controlsStrategy="responsive"
        responsive={{
          0: { items: 1.5 },
          400: { items: 2 },
          550: { items: 3 },
          700: { items: 4 },
          900: { items: 5 },
          1200: { items: 6 },
        }}
        renderPrevButton={() => (
          <ArrowBox
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              transform: "translateY(-50%)",
              display: { xs: "none", sm: "block" },
            }}
          >
            <NavigateBeforeIcon
              sx={{ verticalAlign: "-0.7rem", color: "white" }}
            />
          </ArrowBox>
        )}
        renderNextButton={() => (
          <ArrowBox
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              transform: "translateY(-50%)",
              display: { xs: "none", sm: "block" },
            }}
          >
            <NavigateNextIcon
              sx={{ verticalAlign: "-0.7rem", color: "white" }}
            />
          </ArrowBox>
        )}
      />
    </>
  );
}
