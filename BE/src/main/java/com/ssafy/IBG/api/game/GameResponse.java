package com.ssafy.IBG.api.game;

import com.ssafy.IBG.api.review.ReviewResponse;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.Review;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class GameResponse{
    private Integer gameNo;
    private String gameImg;
    private String gameName;
    private Integer gameYear;
    private Double gameTotalScore;
    private boolean isLike;
    private Integer gameMinPlayer;
    private Integer gameMaxPlayer;
    private Integer gameMinTime;
    private Integer gameMaxTime;
    private Double gameWeight;
    private String gameCategory;
    private List<ReviewResponse> ResponseReviewList;

    public GameResponse(Game game, boolean isLike, List<Review> reviewList) {
        this.gameNo = game.getGameNo();
        this.gameImg = game.getGameImg();
        this.gameName = game.getGameName();
        this.gameYear = game.getGameYear();
        this.gameTotalScore = game.getGameTotalScore();
        this.isLike = isLike;
        this.gameMinPlayer = game.getGameMinPlayer();
        this.gameMaxPlayer = game.getGameMaxPlayer();
        this.gameMinTime = game.getGameMinTime();
        this.gameMaxTime = game.getGameMaxTime();
        this.gameWeight = game.getGameWeight();
        this.gameCategory = game.getGameCategory();
        this.ResponseReviewList = reviewList.stream()
                .map(rl -> new ReviewResponse(rl))
                .collect(Collectors.toList());
    }
}