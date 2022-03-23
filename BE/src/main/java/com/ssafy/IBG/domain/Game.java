package com.ssafy.IBG.domain;

import lombok.Data;
import javax.persistence.*;
import java.util.List;

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
    private Integer gameMinPlayer;

    @Column(name = "gameMaxPlayer")
    private Integer gameMaxPlayer;

    @Column(name = "gameMinTime")
    private Integer gameMinTime;

    @Column(name = "gameMaxTime")
    private Integer gameMaxTime;

    @Column(name = "gameYear")
    private Integer gameYear;

    @Column(name = "gameTotalScore")
    private Double gameTotalScore;

    @Column(name = "gameImg")
    private String gameImg;

    @Column(name = "gameAge")
    private Integer gameAge;

    @Column(name = "gameCategory")
    private String gameCategory;

    @Column(name = "gameWeight")
    private Double gameWeight;

    @Column(name = "gameDesc")
    private String gameDescription;

    @OneToMany(mappedBy = "game")
    private List<Review> review;

}
