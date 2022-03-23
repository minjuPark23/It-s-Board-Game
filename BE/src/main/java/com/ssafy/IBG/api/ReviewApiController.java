package com.ssafy.IBG.api;

import com.ssafy.IBG.api.review.ReviewRequest;
import com.ssafy.IBG.api.review.ReviewResponse;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.Result;
import com.ssafy.IBG.domain.Review;
import com.ssafy.IBG.service.GameService;
import com.ssafy.IBG.service.ReviewService;
import lombok.Data;
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

    @GetMapping("/review/{gameNo}")
    public Result getReviewList(@PathVariable("gameNo") int gameNo){
        List<Review> reviewList = reviewService.findByGameNo(gameNo);
        List<ReviewResponse> collect = reviewList.stream()
                .map(rl -> new ReviewResponse(rl))
                .collect(Collectors.toList());
        return new Result(HttpStatus.OK.value(), collect);
    }

    @PostMapping("/review")
    public Result setReview(@RequestBody ReviewRequest request){
        Review review = new Review();
        review.setReviewContent(request.getContent());
        Game game = gameService.findByGameNo(request.getGameNo());
        review.setGame(game);
        review.setUserNo(0);
        reviewService.saveReview(review);

        return new Result(HttpStatus.OK.value(), null);
    }

}
