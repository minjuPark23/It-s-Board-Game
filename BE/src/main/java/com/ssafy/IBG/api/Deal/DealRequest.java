package com.ssafy.IBG.api.Deal;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DealRequest {
    private int gameNo;
    private int userNo;
    private String dealTitle;
    private String dealContent;
    private MultipartFile file;
    private int dealPrice;
}