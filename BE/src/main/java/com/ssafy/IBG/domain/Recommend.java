package com.ssafy.IBG.domain;

import javax.persistence.*;

@Entity
@Table
public class Recommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recommendNo;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "gameNo")
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userNo")
    private User user;

    private double recommendRating;
}
