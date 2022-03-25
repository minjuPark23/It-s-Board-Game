package com.ssafy.IBG.api;

import com.ssafy.IBG.api.game.*;
import com.ssafy.IBG.api.review.ReviewResponse;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.domain.Review;
import com.ssafy.IBG.service.GameService;
import com.ssafy.IBG.service.InterestService;
import com.ssafy.IBG.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class GameApiController {

    private final GameService gameService;
    private final ReviewService reviewService;
    private final InterestService interestService;
    
    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:47
    * @desc: 자동 완성 검색
    * @modify :
    * - author : 박민주
    * - date : 2022-03-25 오전 11:47
    * - desc : userNo 추가
    **/
    @PostMapping("/search/auto")
    public Result getSearchAutoComplete(@RequestBody SearchNameRequest request){
        List<Game> gameList = gameService.getGameSearchGame(request.getSearchName());
        return getSearchResult(gameList, request.getUserNo());
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:47
    * @desc: 게임 이름 검색 상세보기
    * @modify :
    * - author : 박민주
    * - date : 2022-03-25 오전 11:58
    * - desc : game에 대한 user like 전달
    **/
    @PostMapping("/search")
    public Result getGameByGameName(@RequestBody GameNameRequest request){
        Game game = gameService.getGameByGameName(request.getGameName());
        if(game == null){
            return new Result(HttpStatus.NO_CONTENT.value());
        }else{
            /** gameNo와 userNo **/
            boolean isLike = interestService.getIsLike(request.getUserNo(), game.getGameNo());
            List<Review> reviewList = reviewService.getReviewByGameNo(game.getGameNo());
            return new Result(HttpStatus.OK.value(), new GameResponse(game, isLike, reviewList));
        }
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:48
    * @desc: 게임 번호 상세보기
    * @modify :
    * - author : 박민주
    * - date : 2022-03-25 오전 11:57
    * - desc : game에 대한 user like 전달
    **/
    @GetMapping("/search/{gameNo}/{userNo}")
    public Result getGame(@PathVariable("gameNo") Integer gameNo, @PathVariable("userNo") Integer userNo){
        Game game = gameService.getGameByGameNo(gameNo);
        if(game == null){
            return new Result(HttpStatus.NO_CONTENT.value());
        }else{
            /** gameNo와 userNo **/
            boolean isLike = interestService.getIsLike(userNo, gameNo);
            List<Review> reviewList = reviewService.getReviewByGameNo(game.getGameNo());
            return new Result(HttpStatus.OK.value(), new GameResponse(game, isLike, reviewList));
        }
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:48
    * @desc: 검색 상세 필터
    * - author : 박민주
    * - date : 2022-03-25 오전 11:47
    * - desc : userNo 추가
    **/
    @PostMapping("/search/filter")
    public Result getGameByFilter(@RequestBody SearchFilterRequest request){
        List<Game> gameList = gameService.getGameByFilter(request.getGameName(), request.getGamePlayer(), request.getGameTime(), request.getGameWeight(), request.getGameAge(), request.getGameScore(), request.getGameCategory());
        System.out.println(gameList.size());
        return getSearchResult(gameList,request.getUserNo());

    }

    /**
    * @author : 박민주
    * @date : 2022-03-25 오전 11:49
    * @desc : game에 대한 user like 전달
    **/
    private Result getSearchResult(List<Game> gameList, Integer userNo) {
        if(gameList.isEmpty()){
            return new Result(HttpStatus.NO_CONTENT.value(), null);
        }else{
            List<GameListResponse> collect = gameList.stream()
                    .map(gl -> {
                        boolean isLike = interestService.getIsLike(userNo, gl.getGameNo());
                        return new GameListResponse(gl, isLike);
                    })
                    .collect(Collectors.toList());
            return new Result(HttpStatus.OK.value(), collect);
        }
    }

}
