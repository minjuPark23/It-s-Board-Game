package com.ssafy.IBG.api.user;

import com.ssafy.IBG.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private int user_no;
    private String user_email;

    public UserDto(User user) {
        this.user_no = user.getUserNo();
        this.user_email = user.getUserEmail();
    }
}
