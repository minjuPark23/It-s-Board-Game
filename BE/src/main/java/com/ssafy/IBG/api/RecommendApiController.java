package com.ssafy.IBG.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.api.game.GameListResponse;
import com.ssafy.IBG.api.recommend.RecommendRequest;
import com.ssafy.IBG.api.recommend.RecommendResultResponse;
import com.ssafy.IBG.api.recommend.RecommendSurveyResponse;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.Recommend;
import com.ssafy.IBG.domain.Score;
import com.ssafy.IBG.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class RecommendApiController {

    private final RecommendService recommendService;
    private final InterestService interestService;
    private final RESTAPIService restapiService;
    private final GameService gameService;
    private final ScoreService scoreService;

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
     * @modify :
     * - author : 박민주
     * - date : 2022-04-04 오전 2:15
     * - desc : 평점 수 대비 평점으로 인기 목록 뽑기
     * */
    @GetMapping("/game/ranking/{userNo}")
    public Result getRecommendByRanking(@PathVariable(name = "userNo") Integer userNo) throws JsonProcessingException {
        String[] game_no_list = restapiService.requestGETAPI2("/popular/predict");
        List<Game> game_popular_list = new ArrayList<>();
        for (String s : game_no_list) {
            Game game = gameService.getGameByGameNo(Integer.parseInt(s));
            game_popular_list.add(game);
        }

        List<GameListResponse> collect = game_popular_list.stream()
                .map(gpl -> {
                    boolean isLike = interestService.getIsLike(userNo, gpl.getGameNo());
                    return new GameListResponse(gpl, isLike);
                }).collect(Collectors.toList());

        if (collect.isEmpty()) return new Result(HttpStatus.BAD_REQUEST.value());
        return new Result(HttpStatus.OK.value(), collect);
    }

    /**
    * @author : 박민주
    * @date : 2022-04-04 오전 2:34
    * @desc : 사용자가 한 게임 중 비슷한 게임(랜덤) 유형별 추천
    **/
    @GetMapping("/game/desc/{userNo}")
    public Result getRecommendByDesc(@PathVariable(name = "userNo") Integer userNo) throws JsonProcessingException {
        int gameNo = 1;
        List<Score> scoreList = scoreService.getScoreByUserNo(userNo);
        if (scoreList.isEmpty()) {
            double random = Math.random();
            gameNo = (int)(random*300)+1;
        }else{
            double random = Math.random();
            int n = (int)(random*scoreList.size());
            gameNo = scoreList.get(n).getGame().getGameNo();
        }
        String[] game_no_list = restapiService.requestGETAPI3("/desc/predict", gameNo);

        List<Game> game_desc_list = new ArrayList<>();
        for (String s : game_no_list) {
            Game game = gameService.getGameByGameNo(Integer.parseInt(s));
            game_desc_list.add(game);
        }

        List<GameListResponse> collect = game_desc_list.stream()
                .map(gpl -> {
                    boolean isLike = interestService.getIsLike(userNo, gpl.getGameNo());
                    return new GameListResponse(gpl, isLike);
                }).collect(Collectors.toList());

        if (collect.isEmpty()) return new Result(HttpStatus.BAD_REQUEST.value());
        return new Result(HttpStatus.OK.value(), collect);

    }


    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 예측 평점으로 추천
     * @modify :
     * - author : 박민주
     * - date : 2022-04-01 오후 4:01
     * - desc : 추천 테이블 평점별로 가져오기 추후)셔플해서 가져오기 추가해야한다.
     * */
    @GetMapping("/game/score/{userNo}")
    public Result getRecommendByScore(@PathVariable(name = "userNo") Integer userNo) {
        List<Recommend> recommendList = recommendService.getRecommendByUserNo(userNo);
        if (recommendList == null) {
            System.out.println("아직 평점 데이터 10개가 안된다.");
            return new Result(HttpStatus.OK.value(), null);
        }
        List<RecommendResultResponse> collect = recommendList.stream()
                .map(rl -> {
                    boolean isLike = interestService.getIsLike(rl.getUser().getUserNo(), rl.getGame().getGameNo());
                    return new RecommendResultResponse(rl, isLike);
                }).collect(Collectors.toList());
        System.out.println("평점 데이터 충분해 추천 데이터 반환.");
        return new Result(HttpStatus.OK.value(), collect);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 난이도별 추천
     * */
    @GetMapping("/game/weight/{userNo}")
    public Result getRecommendByWeight(@PathVariable(name="userNo", required = false) Integer userNo){
        List<Score> scores = scoreService.getScoreListByUserNoOrderByRating(userNo);
        double weight = 0d;
        for(Score score : scores){
            weight += score.getGame().getGameWeight();
        }
        weight /= scores.size();

        List<Game> list = recommendService.getRecommendByWeight(userNo, weight, 30);

        for(Game g : list){
            if(scoreService.getScoreByUserNoGameNo(userNo, g.getGameNo()) != null){
                list.remove(g);
            }
        }

        Collections.shuffle(list);

        return getResultList(list, userNo);
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
