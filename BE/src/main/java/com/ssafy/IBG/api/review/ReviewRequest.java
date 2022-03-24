package com.ssafy.IBG.api.review;

import lombok.Data;

@Data
public class ReviewRequest{
    private int userNo;
    private int gameNo;
    private String content;
}
