import { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export default function LikeButton({ initLike = false, size = 25 }) {
  const [isLike, setIsLike] = useState(initLike);

  const toggleLike = () => {
    // api 연결
    setIsLike(!isLike);
  };

  return (
    <>
      {isLike ? (
        <FavoriteOutlinedIcon
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          sx={{ fontSize: size }}
        />
      ) : (
        <FavoriteBorderOutlinedIcon
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          sx={{ fontSize: size }}
        />
      )}
    </>
  );
}
