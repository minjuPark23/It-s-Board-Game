package com.ssafy.IBG.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.api.recommend.RecommendRequest;
import com.ssafy.IBG.api.recommend.RecommendResultResponse;
import com.ssafy.IBG.api.recommend.RecommendSurveyResponse;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.Recommend;
import com.ssafy.IBG.domain.Score;
import com.ssafy.IBG.repository.GameRepository;
import com.ssafy.IBG.repository.ScoreRepository;
import com.ssafy.IBG.service.InterestService;
import com.ssafy.IBG.service.RESTAPIService;
import com.ssafy.IBG.service.RecommendService;
import com.ssafy.IBG.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class RecommendApiController {

    private final RecommendService recommendService;
    private final InterestService interestService;
    private final RESTAPIService restapiService;
    private final ScoreRepository scoreRepository;
    private final GameRepository gameRepository;

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
     * @desc: 리뷰 많은 순서로 추천
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

        Collections.shuffle(collect);

        return new Result(HttpStatus.OK.value(), collect);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 난이도별 추천
     * */
    @GetMapping("/game/weight/{userNo}")
    public Result getRecommendByWeight(@PathVariable Integer userNo){
        List<Score> scores = scoreRepository.findScoreListByUserNoOrderByRating(userNo);
        double weight = 0d;
        for(Score score : scores){
            weight += score.getGame().getGameWeight();
        }
        weight /= scores.size();

        List<Game> list = recommendService.getRecommendByWeight(userNo, weight, 30);

        for(Game g : list){
            if(scoreRepository.findScoreCntByUserNo(userNo) != 0){
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
    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 평가했던 게임들과 유사한 게임 추천, 반환 값 중 가장 처음 오는 게임이 유사 게임
     * */
    @GetMapping("/game/category/{userNo}")
    public Result getRecommendByCategory(@PathVariable Integer userNo) throws JsonProcessingException {
        List<Score> scores = scoreRepository.findScoreListByUserNoOrderByRating(userNo);

        // list 사이즈로 평가한 게임이 없는 경우 에러 처리리

        int num = (int)(Math.random()*(scores.size()));
        System.out.println(scores.get(num).getGame().getGameNo());
        int game_no = scores.get(num).getGame().getGameNo();

        List<Integer> list = restapiService.requestGETAPI("/category", game_no);

        List<Game> gameList = list.stream()
                .map(no-> {

                    return gameRepository.findGameByGameNo(no);
                })
                .collect(Collectors.toList());

        Collections.shuffle(gameList);

        return getResultList(gameList, userNo);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 플레이 인원수별 추천
     * */
    @GetMapping("/game/player/{userNo}")
    public Result getRecommendByPlayer(@PathVariable Integer userNo){
        List<Score> scores = scoreRepository.findScoreListByUserNoOrderByRating(userNo);
        double minPlayers = 0d;
        double maxPlayers = 0d;

        for(Score score : scores){
            Game game = score.getGame();
            minPlayers += game.getGameMinPlayer();
            maxPlayers += game.getGameMaxPlayer();
        }
        minPlayers /= scores.size();
        maxPlayers /= scores.size();

        List<Game> list = recommendService.getRecommendByPlayer(userNo, minPlayers, maxPlayers, 30);

        for(Game g : list){
            if(scoreRepository.findScoreCntByUserNo(userNo) != 0){
                list.remove(g);
            }
        }

        Collections.shuffle(list);

        return getResultList(list, userNo);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 플레이 시간 별 추천
     * */
    @GetMapping("/game/time/{userNo}")
    public Result getRecommendByTime(@PathVariable Integer userNo){
        List<Score> scores = scoreRepository.findScoreListByUserNoOrderByRating(userNo);
        double minPlayTime = 0d;
        double maxPlayTime = 0d;

        for(Score score : scores){
            Game game = score.getGame();
            minPlayTime += game.getGameMinTime();
            maxPlayTime += game.getGameMaxTime();
        }
        minPlayTime /= scores.size();
        maxPlayTime /= scores.size();

        List<Game> list = recommendService.getRecommendByPlayTime(userNo, minPlayTime*0.5, maxPlayTime*1.5, 30);

        for(Game g : list){
            if(scoreRepository.findScoreCntByUserNo(userNo) != 0){
                list.remove(g);
            }
        }

        Collections.shuffle(list);

        return getResultList(list, userNo);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 나이대별 추천
     * */
    @GetMapping("/game/age/{userNo}")
    public Result getRecommendByAge(@PathVariable Integer userNo){
        List<Score> scores = scoreRepository.findScoreListByUserNoOrderByRating(userNo);
        double gameAgeAvg = 0d;

        for(Score score : scores){
            Game game = score.getGame();
            gameAgeAvg += game.getGameAge();
        }
        gameAgeAvg /= scores.size();

        List<Game> list = recommendService.getRecommendByAge(userNo, gameAgeAvg, 30);

        for(Game g : list){
            if(scoreRepository.findScoreCntByUserNo(userNo) != 0){
                list.remove(g);
            }
        }

        Collections.shuffle(list);

        return getResultList(list, userNo);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     * @desc: 초보자 추천
     * */
    @GetMapping("/game/newbie/{userNo}")
    public Result getRecommendByNewbie(@PathVariable Integer userNo){
        double gameAgeWeight = gameRepository.findAvgWeight();

        List<Game> list = recommendService.getRecommendByNewbie(userNo, gameAgeWeight, 30);

        for(Game g : list){
            if(scoreRepository.findScoreCntByUserNo(userNo) != 0){
                list.remove(g);
            }
        }

        Collections.shuffle(list);

        return getResultList(list, userNo);
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
