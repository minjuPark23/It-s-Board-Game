package com.ssafy.IBG.api.recommend;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RecommendTestResponse {
    @JsonProperty(value = "user_no")
    private Integer userNo;

    @JsonProperty(value = "user_auth")
    private String userAuth;

    @JsonProperty(value = "user_email")
    private String userEmail;

    @JsonProperty(value = "user_nick")
    private String userNick;

    @JsonProperty(value = "user_pwd")
    private String userPwd;

}
