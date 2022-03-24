import StarRating from "../../../component/StarRating";

export default function BoardGameDetail() {
  return (
    <div>
      보드게임 상세
      <StarRating initStarRate={5} />
    </div>
  );
}
