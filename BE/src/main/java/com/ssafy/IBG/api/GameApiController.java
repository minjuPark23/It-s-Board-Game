package com.ssafy.IBG.api;

import com.ssafy.IBG.api.game.*;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.domain.Review;
import com.ssafy.IBG.service.GameService;
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
    
    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:47
    * @desc: 자동 완성 검색
    **/
    @PostMapping("/search/auto")
    public Result getSearchAutoComplete(@RequestBody SearchNameRequest searchName){
        List<Game> gameList = gameService.findSearchGame(searchName.getSearchName());
        return getResult(gameList);
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:47
    * @desc: 게임 이름 검색 상세보기
    **/
    @PostMapping("/search")
    public Result getGameByGameName(@RequestBody GameNameRequest gameName){
        Game game = gameService.getGameByGameName(gameName.getGameName());
        List<Review> reviewList = reviewService.getGameByGameNo(game.getGameNo());
        if(game == null){
            return new Result(HttpStatus.NO_CONTENT.value());
        }else{
            /** gameNo와 userNo **/
            return new Result(HttpStatus.OK.value(), new GameResponse(game, false, reviewList));
        }
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:48
    * @desc: 게임 번호 상세보기
    **/
    @GetMapping("/search/{gameNo}")
    public Result getGame(@PathVariable("gameNo") int gameNo){
        Game game = gameService.getGameByGameNo(gameNo);
        List<Review> reviewList = reviewService.getGameByGameNo(game.getGameNo());
        if(game == null){
            return new Result(HttpStatus.NO_CONTENT.value());
        }else{
            /** gameNo와 userNo **/
            return new Result(HttpStatus.OK.value(), new GameResponse(game, false, reviewList));
        }
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 5:48
    * @desc: 검색 상세 필터
    **/
    @PostMapping("/search/filter")
    public Result getGameByFilter(@RequestBody SearchFilterRequest request){
        List<Game> gameList = gameService.getGameByFilter(request.getGameName(), request.getGamePlayer(), request.getGameTime(), request.getGameWeight(), request.getGameAge(), request.getGameScore(), request.getGameCategory());
        System.out.println(gameList.size());
        return getResult(gameList);

    }

    private Result getResult(List<Game> gameList) {
        if(gameList.isEmpty()){
            return new Result(HttpStatus.NO_CONTENT.value(), null);
        }else{
            List<GameListResponse> collect = gameList.stream()
                    .map(gl -> {
                        /** game에 대한 user like 전달 **/
                        return new GameListResponse(gl, false);
                    })
                    .collect(Collectors.toList());
            return new Result(HttpStatus.OK.value(), collect);
        }
    }

}
