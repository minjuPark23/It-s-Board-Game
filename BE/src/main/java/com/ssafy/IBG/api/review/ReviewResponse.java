package com.ssafy.IBG.api.review;

import com.ssafy.IBG.domain.Review;
import lombok.Data;

import java.text.SimpleDateFormat;

@Data
public class ReviewResponse{
    private int reviewNo;
    private int userName;
    private String reviewContent;
    private String reviewReg;

    public ReviewResponse(Review review) {
        this.reviewNo = review.getReviewNo();
        /** review.user.userName; **/
        this.userName = review.getUserNo();
        this.reviewContent = review.getReviewContent();
        this.reviewReg = new SimpleDateFormat("yyyyMMdd").format(review.getReviewReg());
    }
}

