package com.ssafy.IBG.api;

import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.api.recommend.RecommendRequest;
import com.ssafy.IBG.api.recommend.RecommendResultResponse;
import com.ssafy.IBG.api.recommend.RecommendSurveyResponse;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.service.InterestService;
import com.ssafy.IBG.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class RecommendApiController {

    private final RecommendService recommendService;
    private final InterestService interestService;

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 11:00
     * @desc: 유저에게 설문을 받을 게임 데이터 목록 전송
     * */
    @GetMapping("/user/survey")
    public Result getSurveyGameList(){

        List<Game> list = recommendService.getGameForSurvey(50);

        if(list.isEmpty())
            return new Result(HttpStatus.NO_CONTENT.value());

        List<RecommendSurveyResponse> collect = list.stream()
                .map(g -> {
                    return new RecommendSurveyResponse(g.getGameNo(), g.getGameName(), g.getGameImg());
                })
                .collect(Collectors.toList());

        return new Result(HttpStatus.OK.value(), collect);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 14:00
     * @desc: 리뷰 많은 순서로 추천 / Query 테스트 필요
     * */
    @GetMapping("/game/review")
    public Result getRecommendByReviews(@RequestBody RecommendRequest request){
        List<Game> list = recommendService.getRecommendByReviews(50);

        if(list.isEmpty())
            return new Result(HttpStatus.NO_CONTENT.value());


        return getResultList(list, request.getUserNo());
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 14:00
     * @desc: 보드 게임 랭킹 순서로 추천(평점 기준 순서)
     * */
    @GetMapping("/game/ranking")
    public Result getRecommendByRanking(@RequestBody RecommendRequest request){
        List<Game> list = recommendService.getRecommendByRanking(50);

        if(list.size() == 0)
            return new Result(HttpStatus.NO_CONTENT.value());

        return getResultList(list, request.getUserNo());
    }


    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 추천 게임 목록을 DTO로 담는 메소드
     * */
    private Result getResultList(List<Game> list, Integer userNo){
        List<RecommendResultResponse> collect = list.stream()
                .map(g-> {
                    if(userNo == null)
                        return new RecommendResultResponse(g, false);

                    return new RecommendResultResponse(g, interestService.getIsLike(userNo, g.getGameNo()));
                })
                .collect(Collectors.toList());
        return new Result(HttpStatus.OK.value(), collect);
    }
}
