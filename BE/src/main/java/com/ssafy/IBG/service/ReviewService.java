package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Review;
import com.ssafy.IBG.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 6:24
    **/
    public List<Review> getReviewByGameNo(int gameNo){
        return reviewRepository.findReviewByGameNo(gameNo);
    }

    /**
    * @author : 박민주
    * @date : 2022-03-23 오후 6:24
    **/
    @Transactional
    public void saveReview(Review review){
        reviewRepository.saveReview(review);
    }
}
