package com.ssafy.IBG.api.recommend;

import com.ssafy.IBG.domain.Game;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecommendResultResponse {
    private int gameNo;
    private String gameName;
    private String gameImg;
    private double gameTotalScore;
    private int gameMinPlayer;
    private int gameMaxPlayer;
    private String gameCategory;
    private boolean isLike;

    public RecommendResultResponse(Game g, boolean isLike){
        this.gameNo = g.getGameNo();
        this.gameName = g.getGameName();
        this.gameImg = g.getGameImg();
        this.gameTotalScore = g.getGameTotalScore();
        this.gameMinPlayer = g.getGameMinPlayer();
        this.gameMaxPlayer = g.getGameMaxPlayer();
        this.gameCategory = g.getGameCategory();
        this.isLike = isLike;
    }
}
