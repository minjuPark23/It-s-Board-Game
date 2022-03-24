package com.ssafy.IBG.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Interest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeNo;

    private int userNo;

    private int gameNo;

    public Interest(int userNo, int gameNo) {
        this.userNo = userNo;
        this.gameNo = gameNo;
    }
}
