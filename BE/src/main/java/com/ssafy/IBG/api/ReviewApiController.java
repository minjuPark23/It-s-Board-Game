package com.ssafy.IBG.api;

import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.api.review.ReviewRequest;
import com.ssafy.IBG.api.review.ReviewResponse;
import com.ssafy.IBG.domain.Game;
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
public class ReviewApiController {

    private final ReviewService reviewService;
    private final GameService gameService;

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 6:22
    * @desc: 게임 하나의 리뷰 목록
    **/
    @GetMapping("/review/{gameNo}")
    public Result getReviewList(@PathVariable("gameNo") int gameNo){
        List<Review> reviewList = reviewService.getReviewByGameNo(gameNo);
        List<ReviewResponse> collect = reviewList.stream()
                .map(rl -> new ReviewResponse(rl))
                .collect(Collectors.toList());
        return new Result(HttpStatus.OK.value(), collect);
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 6:22
    * @desc: 리뷰 등록
    **/
    @PostMapping("/review")
    public Result setReview(@RequestBody ReviewRequest request){
        Review review = new Review();
        review.setReviewContent(request.getContent());
        Game game = gameService.getGameByGameNo(request.getGameNo());
        review.setGame(game);
        /** 유저 찾기 **/
        review.setUserNo(0);
        reviewService.saveReview(review);

        return new Result(HttpStatus.OK.value(), null);
    }

}
