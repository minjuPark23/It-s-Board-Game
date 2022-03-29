import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

// initStarRate 속성으로 초기 별점(사용자가 별점을 준 경우 해당 별점)을 받는다.(default = 0)
export default function StarRating({ initStarRate = 0, size = 25 }) {
  const [starRate, setStarRate] = useState(initStarRate);
  const scores = [2, 4, 6, 8, 10];

  // 별 하나 컴포넌트, 선택 여부와 점수 속성을 가진다.
  const Star = ({ selected = false, score = 0 }) => (
    <StarIcon
      color={selected ? "warning" : "disabled"}
      onClick={() => StoreStarRate(score)}
      sx={{ fontSize: size }}
    />
  );

  // 별점 저장 함수
  const StoreStarRate = (score: number) => {
    setStarRate(score);
    // 별점 저장 api 연결 추가하기
  };

  return (
    <div>
      {scores.map((score, i) => (
        <Star key={i} selected={starRate >= score - 1} score={score} />
      ))}
    </div>
  );
}
