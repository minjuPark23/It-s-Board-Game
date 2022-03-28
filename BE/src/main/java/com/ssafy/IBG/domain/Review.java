package com.ssafy.IBG.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@Table
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewNo;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userNo")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "gameNo")
    private Game game;

    private String reviewContent;

    //    @Temporal(TemporalType.TIMESTAMP)
    private String reviewReg;

    public Review(User user, Game game, String reviewContent) {
        this.user = user;
        this.game = game;
        this.reviewContent = reviewContent;
        SimpleDateFormat date = new SimpleDateFormat("yyyy MM");
        this.reviewReg = date.toString();
    }

}
