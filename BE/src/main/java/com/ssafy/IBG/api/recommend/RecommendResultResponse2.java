package com.ssafy.IBG.api.recommend;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class RecommendResultResponse2 {
    private String title;
    private List<RecommendResultResponse> recommendResultResponses;

    public RecommendResultResponse2(String title, List<RecommendResultResponse> recommendResultResponses) {
        this.title = title;
        this.recommendResultResponses = recommendResultResponses;
    }
}
