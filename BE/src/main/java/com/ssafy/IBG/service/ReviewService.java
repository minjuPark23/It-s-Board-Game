package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Review;
import com.ssafy.IBG.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<Review> findByGameNo(int gameNo){
        return reviewRepository.findByGameNo(gameNo);
    }

    @Transactional
    public void saveReview(Review review){
        System.out.println(review.getReviewContent());
        reviewRepository.save(review);
    }
}
