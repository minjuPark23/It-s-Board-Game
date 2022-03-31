package com.ssafy.IBG.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.api.recommend.RecommendRequest;
import com.ssafy.IBG.api.recommend.RecommendResultResponse;
import com.ssafy.IBG.api.recommend.RecommendSurveyResponse;
import com.ssafy.IBG.api.recommend.RecommendTestResponse;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.service.InterestService;
import com.ssafy.IBG.service.RESTAPIService;
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
    private final RESTAPIService restapiService;

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 11:00
     * @desc: 유저에게 설문을 받을 게임 데이터 목록 전송
     * */
    @GetMapping("/user/survey")
    public Result getSurveyGameList(@RequestBody RecommendRequest request){

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
    public Result getRecommendByReviews(@RequestBody(required = false) RecommendRequest request){

        List<Game> list = recommendService.getRecommendByReviews(50);

        // 데이터 못 찾을 때
        if(list.isEmpty())
            return new Result(HttpStatus.NO_CONTENT.value());

        // request.getUserNo()가 null일 때 좋아요 false로 제공
        if(request == null)
            return getResultList(list, null);

        return getResultList(list, request.getUserNo());
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 14:00
     * @desc: 보드 게임 랭킹 순서로 추천(평점 기준 순서)
     * */
    @GetMapping("/game/ranking")
    public Result getRecommendByRanking(@RequestBody(required = false) RecommendRequest request){
        List<Game> list = recommendService.getRecommendByRanking(50);

        if(list.size() == 0)
            return new Result(HttpStatus.NO_CONTENT.value());

        // request.getUserNo()가 null일 때 좋아요 false로 제공
        if(request == null)
            return getResultList(list, null);

        return getResultList(list, request.getUserNo());
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 예측 평점으로 추천
     * */
    @GetMapping("/game/score")
    public Result getRecommendByScore(@RequestBody(required = false) RecommendRequest request) throws JsonProcessingException {
        List<RecommendTestResponse> list = restapiService.requestGETAPI("/user", null);

        return new Result(HttpStatus.OK.value(), list);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 난이도별 추천
     * */
    @GetMapping("/game/weight")
    public Result getRecommendByWeight(@RequestBody(required = false) RecommendRequest request){

        return null;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 카테고리별 추천
     * */
    @GetMapping("/game/category")
    public Result getRecommendByCategory(@RequestBody(required = false) RecommendRequest request){

        return null;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 플레이 인원수별 추천
     * */
    @GetMapping("/game/player")
    public Result getRecommendByPlayer(@RequestBody(required = false) RecommendRequest request){

        return null;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 플레이 시간 별 추천
     * */
    @GetMapping("/game/time")
    public Result getRecommendByTime(@RequestBody(required = false) RecommendRequest request){

        return null;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 나이대별 추천
     * */
    @GetMapping("/game/age")
    public Result getRecommendByAge(@RequestBody(required = false) RecommendRequest request){

        return null;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 초보자 추천
     * */
    @GetMapping("/game/newbie")
    public Result getRecommendByNewbie(@RequestBody(required = false) RecommendRequest request){

        return null;
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
