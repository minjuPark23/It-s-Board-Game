package com.ssafy.IBG.api.review;

import com.ssafy.IBG.domain.Review;
import lombok.Data;

import java.text.SimpleDateFormat;

@Data
public class ReviewResponse{
    private int reviewNo;
    private String userNick;
    private String reviewContent;
    private String reviewReg;

    public ReviewResponse(Review review) {
        this.reviewNo = review.getReviewNo();
        this.userNick = review.getUser().getUserNick();
        this.reviewContent = review.getReviewContent();
        this.reviewReg = new SimpleDateFormat("yyyyMMdd").format(review.getReviewReg());
    }
}

