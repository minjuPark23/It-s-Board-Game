package com.ssafy.IBG.api.game;

import com.ssafy.IBG.domain.Game;
import lombok.Data;

@Data
public class GameListResponse{
    private Integer gameNo;
    private String gameName;
    private String gameCategory;
    private Integer gameMinPlayer;
    private Integer gameMaxPlayer;
    private Double gameTotalScore;
    private String gameImg;
    private boolean isLike;

    public GameListResponse(Game game, boolean isLike) {
        this.gameNo = game.getGameNo();
        this.gameName = game.getGameName();
        this.gameCategory = game.getGameCategory();
        this.gameMinPlayer = game.getGameMinPlayer();
        this.gameMaxPlayer = game.getGameMaxPlayer();
        this.gameTotalScore = game.getGameTotalScore();
        this.gameImg = game.getGameImg();
        this.isLike = isLike;
    }
}
