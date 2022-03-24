package com.ssafy.IBG.domain;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scoreNo;

    private int userNo;

    private int gameNo;

    private int scoreRating;

    public Score(int userNo, int gameNo, int scoreRating){
        this.userNo = userNo;
        this.gameNo = gameNo;
        this.scoreRating = scoreRating;
    }

}
