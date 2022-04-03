package com.ssafy.IBG.api;

import com.ssafy.IBG.api.game.*;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.Result;
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

    @PostMapping("/search/auto")
    public Result getSearchAutoComplete(@RequestBody SearchNameRequest searchName){
        List<Game> gameList = gameService.findSearchGame(searchName.getSearchName());
        return getResult(gameList);
    }

    @PostMapping("/search")
    public Result getGameByGameName(@RequestBody GameNameRequest gameName){
        Game game = gameService.findByGameName(gameName.getGameName());
        List<Review> reviewList = reviewService.findByGameNo(game.getGameNo());
        if(game == null){
            return new Result(HttpStatus.NO_CONTENT.value(), null);
        }else{
            /** gameNo와 userNo **/
            return new Result(HttpStatus.OK.value(), new GameResponse(game, false, reviewList));
        }
    }

    @GetMapping("/search/{gameNo}")
    public Result getGame(@PathVariable("gameNo") int gameNo){
        Game game = gameService.findByGameNo(gameNo);
        List<Review> reviewList = reviewService.findByGameNo(game.getGameNo());
        if(game == null){
            return new Result(HttpStatus.NO_CONTENT.value(), null);
        }else{
            /** gameNo와 userNo **/
            return new Result(HttpStatus.OK.value(), new GameResponse(game, false, reviewList));
        }
    }

    @PostMapping("/search/filter")
    public Result getGameByFilter(@RequestBody SearchFilterRequest request){
        List<Game> gameList = gameService.findByFilter(request.getGameName(), request.getGamePlayer(), request.getGameTime(), request.getGameWeight(), request.getGameAge(), request.getGameScore(), request.getGameCategory());
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
