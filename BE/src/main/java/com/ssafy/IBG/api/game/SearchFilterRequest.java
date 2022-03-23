package com.ssafy.IBG.api.game;

import lombok.Data;

import java.util.List;

@Data
public class SearchFilterRequest {
    /** 이상 찾기 **/
    private String gameName;
    private Integer gamePlayer;
    private Integer gameTime;
    private double gameWeight;
    private Integer gameAge;
    private double gameScore;
    private List<String> gameCategory;
}
