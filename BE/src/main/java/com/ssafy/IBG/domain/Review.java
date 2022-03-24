package com.ssafy.IBG.domain;

import lombok.Data;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@Table
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewNo")
    private int reviewNo;

    @Column(name = "userNo")
    private int userNo;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "gameNo")
    private Game game;

    @Column(name = "reviewContent")
    private String reviewContent;

    @Column(name = "reviewReg", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reviewReg;

}
