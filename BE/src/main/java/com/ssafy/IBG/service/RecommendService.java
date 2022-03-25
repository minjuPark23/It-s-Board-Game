package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.repository.RecommendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final RecommendRepository recommendRepository;

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 11:00
     * @desc: 설문조사용 랜덤 게임 목록
     **/
    public List<Game> getGameForSurvey(int limit){
        List<Game> list = recommendRepository.findGameForSurvey(limit);

        // list 셔플
        Collections.shuffle(list);

        return list;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오후 15:00
     * @desc: 리뷰 순으로 게임 추천 / Query Test 필요
     **/
    public List<Game> getRecommendByReviews(int limit){
        return recommendRepository.findRecommendByReviews(limit);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오후 15:00
     * @desc: 랭킹 순으로 게임 추천(평점 기준)
     **/
    public List<Game> getRecommendByRanking(int limit){
       return recommendRepository.findRecommendByRanking(limit);
    }

}
