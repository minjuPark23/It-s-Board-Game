package com.ssafy.IBG.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@Table
public class Game {

    @Id
    @Column(name = "gameNo")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gameNo;

    @Column(name = "gameName", unique = true)
    private String gameName;

    @Column(name = "gameMinPlayer")
    private int gameMinPlayer;

    @Column(name = "gameMaxPlayer")
    private int gameMaxPlayer;

    @Column(name = "gameMinTime")
    private int gameMinTime;

    @Column(name = "gameMaxTime")
    private int gameMaxTime;

    @Column(name = "gameYear")
    private int gameYear;

    @Column(name = "gameTotalScore")
    private double gameTotalScore;

    @Column(name = "gameImg")
    private String gameImg;

    @Column(name = "gameAge")
    private int gameAge;

    @Column(name = "gameCategory")
    private String gameCategory;

    @Column(name = "gameWeight")
    private double gameWeight;

    @Column(name = "gameDesc")
    private String gameDescription;

    @OneToMany(mappedBy = "game")
    private List<Review> review;

}
